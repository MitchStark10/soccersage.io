import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const uiReducerSlice = createSlice({
    name: 'ui',
    initialState: {
        isUsingOverlay: false,
    },
    reducers: {
        setOverlay: (state, action: PayloadAction<boolean>) => {
            state.isUsingOverlay = action.payload;
        },
    },
});

export const uiReducer = uiReducerSlice.reducer;
