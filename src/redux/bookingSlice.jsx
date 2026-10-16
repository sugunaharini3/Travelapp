// src/redux/bookingSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

const loadCachedState = () => {
  try {
    const cached = localStorage.getItem("cached_travel_booking");
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        ...parsed,
        isCartOpen: false,
      };
    }
  } catch (e) {
    console.error("Failed to load cached state", e);
  }
  return {
    cart: [],
    selectedPackage: null,
    isCartOpen: false,
  };
};

const initialState = loadCachedState();

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },
    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.travelers = (existingItem.travelers || 1) + 1;
      } else {
        state.cart.push({
          ...action.payload,
          travelers: 1,
          travelDate: new Date().toISOString().split("T")[0],
        });
      }
      state.isCartOpen = true;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateTravelers: (state, action) => {
      const { id, count } = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item && count > 0) {
        item.travelers = count;
      }
    },
    updateDates: (state, action) => {
      const { id, date } = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item) {
        item.travelDate = date;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.selectedPackage = null;
    },
  },
});

export const {
  setSelectedPackage,
  setCartOpen,
  addToCart,
  removeFromCart,
  updateTravelers,
  updateDates,
  clearCart,
} = bookingSlice.actions;

const selectCartItems = (state) => state.booking.cart;

export const selectBookingSummary = createSelector(
  [selectCartItems],
  (cart) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * (item.travelers || 1), 0);
    const discount = subtotal >= 100000 ? subtotal * 0.10 : 0;
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * 0.18;
    const finalTotal = taxableAmount + tax;

    return {
      subtotal,
      discount,
      tax,
      finalTotal,
      totalItems: cart.length,
    };
  }
);

export default bookingSlice.reducer;