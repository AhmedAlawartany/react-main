import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import api from "../../clients/wretchClient";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface PaginatedUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

const fetchPaginatedUsers = async ({
  pageParam = 1,
}: {
  pageParam?: number | unknown;
}): Promise<PaginatedUsersResponse> => {
  const response = await api
    .url(`/users?page=${pageParam}&per_page=10`)
    .get()
    .json<PaginatedUsersResponse>();
  return response;
};

export const useGetPaginatedUsers = (
  options?: UseInfiniteQueryOptions<any>
): UseInfiniteQueryResult<any> => {
  return useInfiniteQuery<any>({
    queryKey: ["users"],
    queryFn: ({ pageParam }: QueryFunctionContext<QueryKey, unknown>) =>
      fetchPaginatedUsers({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    ...options,
  });
};
