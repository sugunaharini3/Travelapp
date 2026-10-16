// src/redux/middleware.js

// Requirement (d): Custom Logger Middleware to monitor actions
export const bookingLoggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("🟢 [Redux Action Dispatched]:", action.type, action.payload);
  const result = next(action);
  console.log("🔵 [Next State]:", storeAPI.getState());
  return result;
};

// Requirement (e): Caching Middleware to persist cart & packages to LocalStorage
export const cachingMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("booking/")) {
    const state = storeAPI.getState().booking;
    localStorage.setItem("cached_travel_booking", JSON.stringify(state));
  }
  return result;
};