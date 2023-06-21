import { store } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scrollTopTrigger: 0,
};

export const scrollTopSlice = createSlice({
    name: 'scrollTop',
    initialState,
    reducers: {
        toggleScroll: (state: any) => {
            state.scrollTopTrigger = state.scrollTopTrigger + 1;
            return state;
        },
    },
});

const { toggleScroll: toggleScrollAction } = scrollTopSlice.actions;

export const scrollTopAction = () => {
    store.dispatch(toggleScrollAction());
};

export default scrollTopSlice.reducer;
