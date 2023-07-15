import { createSelector } from '@reduxjs/toolkit';

const auth = (state: any) => state.auth;

export const authSelector = createSelector(auth, (state: any) => {
    return {
        authState: state?.entities,
        authUserState: state?.entities?.user,
    };
});
