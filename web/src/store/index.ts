import { configureStore } from '@reduxjs/toolkit';

import { uiReducer } from './reducers/uiReducer';

export interface RootState {
    ui: {
        isUsingOverlay: boolean;
    };
}

export const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
});
