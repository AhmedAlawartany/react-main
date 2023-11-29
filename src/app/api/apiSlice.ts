import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from 'services/apis/auth/authSlice';
// import { setCredentials, logOut } from '../../features/auth/authSlice'

const BACKEND_API_ENDPOINT = import.meta.env.VITE_APP_BACKEND_API_ENDPOINT;

if (import.meta.env.NODE_ENV === 'development' && !BACKEND_API_ENDPOINT) {
    console.log(
        'BACKEND_API_ENDPOINT config value not found. Please check your environment variables.',
    );
}
console.log(BACKEND_API_ENDPOINT, 'BACKEND_API_ENDPOINT');
const baseQuery = fetchBaseQuery({
    baseUrl: BACKEND_API_ENDPOINT,
    // credentials: 'include',
    prepareHeaders: (headers: any, { getState }: any) => {
        const token = getState().auth?.entities?.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = (await baseQuery(args, api, extraOptions)) as any;

    if (result?.error?.status === 401) {
        console.log('sending refresh token');
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);
        if (refreshResult?.data) {
            // const user = api.getState().auth.user;
            // store the new token
            // api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const apiSlice = createApi({
    reducerPath: 'splitApi',
    /**
     * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
     */
    // baseQuery: baseQueryWithRetry,
    /**
     * Tag types must be defined in the original API definition
     * for any tags that would be provided by injected endpoints
     */
    tagTypes: ['Users'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
