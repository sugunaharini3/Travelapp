
import { useCallback, useEffect, useMemo, useState } from "react";

const CART_KEY = "beyondHorizonsCart";

function useBookingCart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [travelDates, setTravelDates] = useState({ start: "", end: "" });
  const [travelers, setTravelers] = useState(1);
  const [travelerDetails, setTravelerDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((packageData) => {
    setCartItems((items) => {
      if (items.some((item) => item.id === packageData.id)) {
        return items;
      }
      return [...items, packageData];
    });
    setSelectedPackage(null);
  }, []);

  const removeFromCart = useCallback((packageId) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== packageId)
    );
  }, []);

  const updateTravelDates = useCallback((start, end) => {
    setTravelDates({ start, end });
  }, []);

  const updateTravelers = useCallback((value) => {
    setTravelers(Math.max(1, Number(value) || 1));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setSelectedPackage(null);
    setTravelDates({ start: "", end: "" });
    setTravelers(1);
    setTravelerDetails({ name: "", email: "", phone: "" });
    setBookingDetails(null);
    setPaymentMethod("");
  }, []);

  const tripDuration = useMemo(() => {
    if (!travelDates.start || !travelDates.end) return 0;
    const start = new Date(travelDates.start);
    const end = new Date(travelDates.end);
    const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : 0;
  }, [travelDates]);

  const travelerCount = useMemo(() => {
    return Math.max(1, Number(travelers) || 1);
  }, [travelers]);

  const packageCost = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * travelerCount,
      0
    );
  }, [cartItems, travelerCount]);

  const discount = useMemo(() => {
    return packageCost >= 100000 ? Math.round(packageCost * 0.1) : 0;
  }, [packageCost]);

  const taxes = useMemo(() => {
    return Math.round((packageCost - discount) * 0.05);
  }, [packageCost, discount]);

  const finalBookingAmount = useMemo(() => {
    return packageCost - discount + taxes;
  }, [packageCost, discount, taxes]);

  const confirmBooking = useCallback(() => {
    if (
      cartItems.length === 0 ||
      !travelDates.start ||
      !travelDates.end ||
      !travelerDetails.name ||
      !travelerDetails.email ||
      travelerDetails.phone.length !== 10
    ) {
      return false;
    }

    setBookingDetails({
      packages: cartItems,
      travelers: travelerCount,
      travelDates,
      travelerDetails,
      paymentMethod,
      totalAmount: finalBookingAmount
    });

    return true;
  }, [
    cartItems,
    travelerCount,
    travelDates,
    travelerDetails,
    paymentMethod,
    finalBookingAmount
  ]);

  return {
    cartItems,
    selectedPackage,
    setSelectedPackage,
    travelDates,
    travelers,
    travelerCount,
    travelerDetails,
    setTravelerDetails,
    bookingDetails,
    paymentMethod,
    setPaymentMethod,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateTravelDates,
    updateTravelers,
    clearCart,
    confirmBooking,
    tripDuration,
    packageCost,
    discount,
    taxes,
    finalBookingAmount
  };
}

export default useBookingCart;