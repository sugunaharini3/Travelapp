import { createContext, useContext } from "react"
import usePackages from "../hooks/usePackages";
import useBookingCart from "../hooks/useBookingCart";
const BookingContext = createContext();
export function BookingProvider({ children }) {

  const packageData = usePackages();
  const bookingData = useBookingCart();
  return (
    <BookingContext.Provider
      value={{
        ...packageData,
        ...bookingData
      }}>{children}
    </BookingContext.Provider>
  );
}
export function useBooking() {
  return useContext(BookingContext);}