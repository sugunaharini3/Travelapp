// src/services/api.js
import { getCurrentToken, logoutUser } from "./authApi";

// Helper to load data from localStorage
const getStoredData = (key, initial) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

// Helper to save data to localStorage
const saveStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Simulate network delay so loading states and spinners can be tested
const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to check token and build authorized headers
const getAuthHeaders = () => {
  const token = getCurrentToken();
  if (!token || token === "expired_token") {
    logoutUser();
    window.location.href = "/login";
    throw new Error("Session expired or unauthorized. Please log in again.");
  }
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

// a) Retrieve travel packages using GET
export const fetchPackages = async () => {
  console.log("🚀 [API GET] Fetching available travel packages...");
  await delay();
  
  const defaultPackages = [
    { id: "1", title: "Japan Explorer", duration: "8 Days / 7 Nights", price: 200000, location: "Japan" },
    { id: "2", title: "Dubai Luxury Escape", duration: "5 Days / 4 Nights", price: 150000, location: "Dubai" },
    { id: "3", title: "Swiss Alps Adventure", duration: "6 Days / 5 Nights", price: 180000, location: "Switzerland" }
  ];
  
  const packages = getStoredData("app_packages", defaultPackages);
  return { data: packages };
};

// b & c) Add a travel package or booking using POST with attached token
export const createBooking = async (bookingData) => {
  // c) Attach token and secure request
  getAuthHeaders();

  console.log("📥 [API POST] Creating new booking with auth token...", bookingData);
  await delay();
  
  const bookings = getStoredData("app_bookings", []);
  const newBooking = { 
    id: Date.now().toString(), 
    createdAt: new Date().toISOString(),
    ...bookingData 
  };
  
  bookings.push(newBooking);
  saveStoredData("app_bookings", bookings);
  
  console.log("✅ [API POST SUCCESS] Booking saved with ID:", newBooking.id);
  return { data: newBooking };
};

// c) Update booking details using PUT/PATCH with auth
export const updateBooking = async (id, updatedData) => {
  getAuthHeaders();
  console.log(`✏️ [API PUT/PATCH] Updating booking ID: ${id}`, updatedData);
  await delay();
  
  let bookings = getStoredData("app_bookings", []);
  let updatedRecord = null;
  
  bookings = bookings.map((b) => {
    if (b.id === id) {
      updatedRecord = { ...b, ...updatedData };
      return updatedRecord;
    }
    return b;
  });
  
  saveStoredData("app_bookings", bookings);
  console.log("✅ [API UPDATE SUCCESS]", updatedRecord);
  return { data: updatedRecord };
};

// d) Cancel a booking using DELETE with auth
export const cancelBooking = async (id) => {
  getAuthHeaders();
  console.log(`❌ [API DELETE] Cancelling booking ID: ${id}`);
  await delay();
  
  let bookings = getStoredData("app_bookings", []);
  const filteredBookings = bookings.filter((b) => b.id !== id);
  
  saveStoredData("app_bookings", filteredBookings);
  console.log(`✅ [API DELETE SUCCESS] Booking ${id} removed.`);
  return { data: { success: true, id } };
};

// e) Retrieve booking history using GET with auth
export const fetchBookingHistory = async () => {
  getAuthHeaders();
  console.log("📦 [API GET] Fetching user booking history with auth token...");
  await delay();
  
  const bookings = getStoredData("app_bookings", []);
  console.log(`✅ [API HISTORY SUCCESS] Found ${bookings.length} bookings.`);
  return { data: bookings };
};