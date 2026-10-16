// src/App.jsx
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartOpen } from "./redux/bookingSlice";    
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Component/ProtectedRoute";
import Login from "./Component/Login";
import ErrorBoundary from "./Component/ErrorBoundary";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Footer from "./Component/Footer";

import { fetchPackages } from "./services/api"; 

// --- LAZY LOADED ROUTE COMPONENTS (Experiment 2 Optimization) ---
const SearchBar = lazy(() => import("./Component/SearchBar"));
const FilterPanel = lazy(() => import("./Component/FilterPanel"));
const PackageList = lazy(() => import("./Component/PackageList"));
const PackageDetail = lazy(() => import("./Component/PackageDetail"));
const BookingCart = lazy(() => import("./Component/BookingCart"));
const TravelerForm = lazy(() => import("./Component/TravelerForm"));
const Payment = lazy(() => import("./Component/Payment"));
const Checkout = lazy(() => import("./Component/Checkout"));

function AppContent() {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.booking?.isCartOpen) || false;

  useEffect(() => {
    const loadApiData = async () => {
      try {
        console.log("App starting: Triggering API GET request...");
        const response = await fetchPackages();
        console.log("Packages successfully fetched into App:", response.data);
      } catch (error) {
        console.error("API Error encountered:", error);
      }
    };

    loadApiData();
  }, []);

  return (
    <>
      <Header />
      {/* Suspense boundary handles loading fallback while lazy chunks download */}
      <Suspense 
        fallback={
          <div style={{ textAlign: "center", padding: "100px", fontSize: "18px", color: "#666" }}>
            Loading travel module...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/packages"
            element={
              <div className="packages-page-wrapper">
                <SearchBar />
                <FilterPanel />
                <PackageList />
              </div>
            }
          />
          <Route path="/package/:id" element={<PackageDetail />} />
          
          {/* Protected Routes */}
          <Route path="/booking" element={<ProtectedRoute><TravelerForm /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        </Routes>
      </Suspense>
      
      <BookingCart 
        cartOpen={cartOpen} 
        setCartOpen={(isOpen) => dispatch(setCartOpen(isOpen))} 
      />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <AppContent />
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;