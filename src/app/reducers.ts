import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import localforage from 'localforage';

import { authSlice } from 'services/apis/auth/authSlice';
import { apiSlice } from './api/apiSlice';

const authPersistConfig = {
    key: 'auth',
    storage: localforage,
    whiteList: ['entities'],
};

const authPersistReducer = persistReducer(authPersistConfig, authSlice.reducer);

const reducers = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authPersistReducer,
});

export default reducers;
