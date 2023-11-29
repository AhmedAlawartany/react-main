import { router } from 'app/store';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from 'services/apis/auth/authSelector';
import { logOut } from 'services/apis/auth/authSlice';
import {
    getServicesForLuckyDog,
    useDeleteUserMutation,
    useGetUsersQuery,
    usePrefetch,
} from 'services/users/usersApiSlice';

export const Home = () => {
    const [skip, setSkip] = useState<number>(0);

    const dispatch = useDispatch<any>();
    const { authUserState } = useSelector((state: any) => authSelector(state));
    const [deleteUser] = useDeleteUserMutation();

    // const { data } = useGetUsersQuery('getUsers', { pollingInterval: 30000 });
    // const myServices = useSelector((state) => getServicesForLuckyDog(state));
    // console.log(myServices, 'myServicesmyServicesmyServices');

    const handelLogout = () => {
        dispatch(logOut());
        router.navigate('signin', { replace: true });
    };

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetUsersQuery(skip, {
        // pollingInterval: 3000,
        // refetchOnMountOrArgChange: true,
        // skip: false,
        // refetchOnFocus: true,
        // refetchOnReconnect: true,
    });
    const prefetchPage = usePrefetch('getUsers');

    const prefetchNext = useCallback(() => {
        prefetchPage(skip + 10);
    }, [prefetchPage, skip]);

    console.log(users, 'usersusersusersusers');

    const handleDeleteUser = async (id: string) => {
        try {
            // Call the `mutate` function with the user ID to delete the user
            await deleteUser({ id });

            // Optionally, you can show a success message or perform other actions after successful deletion
        } catch (error) {
            // Handle error if the delete request fails
            console.log(error);
        }
    };

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const renderedUsers = users.ids.map((userId: any) => (
            <li className="flex gap-2 justify-between align-middle" key={userId}>
                <div>{`${users?.entities[userId]?.name} `}</div>{' '}
                <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleDeleteUser.bind(this, userId)}
                >
                    Delete
                </button>
            </li>
        ));

        content = (
            <section>
                <h2>Users</h2>

                <ul>{renderedUsers}</ul>
            </section>
        );
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <div className="flex flex-col gap-4 ">
            <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={handelLogout}
            >
                Sighnout
            </button>
            <button onClick={() => setSkip((prev) => prev + 10)} onMouseEnter={prefetchNext}>
                Next
            </button>
            <button onClick={() => setSkip((prev) => prev - 10)}>prev</button>
            <button onClick={refetch}>refetch</button>

            <div>
                {authUserState?.firstname ? (
                    <h1 className="text-black font-bold text-2xl">{`Hi ${authUserState?.firstname}`}</h1>
                ) : null}
                <h1 className="text-black md:text-blue-400  sm:text-red-900 text-2xl">Home</h1>
            </div>
            <div className="mt-10">{content}</div>
        </div>
    );
};
