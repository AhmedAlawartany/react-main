import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { tokens } = action.payload;
      state.entities.token = tokens?.access.token;
    },
    logOut: () => {
      return initialState;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state: any) => state.auth;
export const selectCurrentToken = (state: any) => state.auth;
