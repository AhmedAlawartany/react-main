// import { retry } from '@reduxjs/toolkit/query/react';
import { apiSlice } from 'app/api/apiSlice';
// Create an API instance
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: {
        mutation: (arg: {
            query: (credentials: any) => { url: string; method: string; body: any };
        }) => any;
    }) => ({
        loginAction: builder.mutation({
            query: (credentials: any) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
            // extraOptions: {
            //     backoff: () => {
            //         // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
            //         retry.fail({ fake: 'error' });
            //     },
            // },
        }),
    }),
});

export const { useLoginActionMutation } = authApiSlice;
