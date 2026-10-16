// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import { bookingLoggerMiddleware, cachingMiddleware } from "./middleware";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookingLoggerMiddleware, cachingMiddleware),
});

export default store;