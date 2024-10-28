import React, { useRef } from 'react';
import * as Theme from './Theme';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { User, useGetPaginatedUsers } from '@/services/apis/products/useGetPaginatedUsers';
import UserCard from './UserCard';
import ProductsPageMeta from '@/meta/ProductsPageMeta';

const ProductsPage: React.FC = () => {
    const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useGetPaginatedUsers();
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useIntersectionObserver(
        loadMoreRef,
        () => {
            if (hasNextPage) {
                fetchNextPage();
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        },
    );

    const renderUserList = () => {
        if (!data) return null;

        return data.pages.flatMap((page: any) =>
            page.data.map((user: User) => <UserCard key={user.id} user={user} />),
        );
    };

    if (isLoading) return <Theme.Loading>Loading...</Theme.Loading>;

    if (isError) return <Theme.Errors>{error?.message || 'Error fetching products'}</Theme.Errors>;

    return (
        <Theme.Body>
            <ProductsPageMeta />
            <Theme.FormSection>
                <Theme.FormTitle>Products List</Theme.FormTitle>
                <Theme.ProductList>{renderUserList()}</Theme.ProductList>
                <div ref={loadMoreRef} />
            </Theme.FormSection>
        </Theme.Body>
    );
};

export default ProductsPage;
