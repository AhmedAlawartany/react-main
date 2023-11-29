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
            return state;
        },
        logOut: () => {
            return initialState;
        },
        messageCreated: (state, action) => {
            state.entities.message = action.payload;
            return state;
        },
    },
});

export const { setCredentials, logOut, messageCreated } = authSlice.actions;
