import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './slices/modal';

const store = configureStore({
    reducer: {
        modal: modalReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;