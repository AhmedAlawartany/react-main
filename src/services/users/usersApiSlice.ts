import { createDraftSafeSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from 'app/api/apiSlice';
import { messageCreated } from 'services/apis/auth/authSlice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (skip) => `plans/users?take=10&skip=${skip}`,
            transformResponse: (responseData) => {
                const { ownedPlans } = responseData;
                const newData = ownedPlans;

                return usersAdapter.setAll(initialState, newData);
            },
            keepUnusedDataFor: 5,
            providesTags: (_result, error, arg) =>
                _result
                    ? [
                          ..._result.ids.map((id) => ({ type: 'Users' as const, id })),
                          { type: 'Users', id: 'LIST' },
                      ]
                    : [{ type: 'Users', id: 'LIST' }],
            // providesTags: ['Users'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                dispatch(messageCreated('Fetching post...'));
                try {
                    const data = await queryFulfilled;
                    console.log(data, 'queryFulfilledqueryFulfilledqueryFulfilled');
                    // `onSuccess` side-effect
                    dispatch(messageCreated('Post received!'));
                } catch (err) {
                    // `onError` side-effect
                    dispatch(messageCreated('Error fetching post!'));
                }
            },
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `plans/plan/?planId=${id}`,
                method: 'DELETE',
            }),

            // invalidatesTags: ['Users'],
            // onQueryStarted(id, { dispatch, queryFulfilled }) {
            //     // `onStart` side-effect
            //     console.log(id, 'plansplansplansplansplans');

            //     const update = dispatch(
            //         apiSlice.util.updateQueryData('getUsers', id, (data) => {
            //             console.log(data, 'plansplansplansplansplans');
            //             delete data[id];
            //         }),
            //     );
            //     queryFulfilled.catch((err) => {
            //         console.log(err, 'errerrerrerrerr');
            //         update.undo();
            //     });
            // },
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'Users', id: arg.id }];
            },
        }),
    }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useLazyGetUsersQuery, usePrefetch } =
    usersApiSlice;

// export const getServicesForLuckyDog = createDraftSafeSelector(
//     (state) => apiSlice.endpoints.loginAction.select()(state),
//     (state) => usersApiSlice.endpoints.getUsers.select()(state),
//     (state: any) => state.auth?.user,
//     ({ data: services }, { data: dogs }, user) => {
//         console.log(services, dogs, user, usersApiSlice, apiSlice, 'datadatadatadatadatadatadata');
//         return services;
//     },
// );

export const getServicesForLuckyDog = createDraftSafeSelector(
    (state) => apiSlice.endpoints.getUsers.select()(state),
    (state) => usersApiSlice.endpoints.getUsers.select()(state),
    (state: any) => state.auth?.user,
    (getUsersResult, usersApiResult, user) => {
        console.log(getUsersResult.data, usersApiResult.data, user, 'datadatadatadatadatadatadata');
        return getUsersResult.data; // Adjust the property based on the actual data structure
    },
);
