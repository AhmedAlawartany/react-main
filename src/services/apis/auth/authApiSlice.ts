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
        }),
    }),
});

export const { useLoginActionMutation } = authApiSlice;
