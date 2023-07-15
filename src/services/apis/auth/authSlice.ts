import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.entities.token = action.payload?.tokens?.access.token;
            state.entities.user = action.payload?.user;
        },
        logOut: () => {
            return initialState;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
