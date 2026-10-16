// src/context/BookingContext.jsx
import { createContext, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartOpen as setReduxCartOpen } from "../redux/bookingSlice";
import usePackages from "../hooks/usePackages";
import useBookingCart from "../hooks/useBookingCart";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const packageData = usePackages() || {};
  const bookingData = useBookingCart() || {};
  
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.booking?.isCartOpen) || false;
  
  // Provide a local search state if SearchBar expects it from context
  const [search, setSearch] = useState("");

  const setCartOpen = (isOpen) => {
    dispatch(setReduxCartOpen(isOpen));
  };

  return (
    <BookingContext.Provider
      value={{
        ...packageData,
        ...bookingData,
        cartOpen: isCartOpen,
        setCartOpen,
        search,
        setSearch,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}