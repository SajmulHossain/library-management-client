import { bookReducer } from './features/book/bookSlice';
import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi/bookApi";
import { borrowApi } from './api/borrowApi/borrowApi';


export const store = configureStore({
  reducer: {
    books: bookReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, borrowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
