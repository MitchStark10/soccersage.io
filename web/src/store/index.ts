import { configureStore } from '@reduxjs/toolkit';

import { uiReducer } from './reducers/uiReducer';

export interface RootState {
    isUsingOverlay: boolean;
}

export const store = configureStore({
    reducer: uiReducer,
});
