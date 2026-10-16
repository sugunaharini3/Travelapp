// src/components/Checkout.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/api";
import { getCurrentToken, logoutUser } from "../services/authApi";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.booking);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedTicket, setConfirmedTicket] = useState(null); // Working ticket state

  // Derive values from Redux cart items
  const packageCost = cart.reduce((total, item) => total + (item.price || 0) * (item.travelers || 1), 0);
  const discount = packageCost >= 100000 ? packageCost * 0.10 : 0;
  const taxableAmount = packageCost - discount;
  const taxes = taxableAmount * 0.18;
  const finalBookingAmount = taxableAmount + taxes;

  const totalTravelers = cart.reduce((sum, item) => sum + (item.travelers || 1), 0);

  // Handler that triggers the protected POST request and generates the ticket
  const handleConfirmAndPost = async () => {
    const token = getCurrentToken();
    if (!token || token === "expired_token") {
      alert("Session expired or unauthorized. Please log in again.");
      logoutUser();
      navigate("/login", { replace: true });
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const payload = {
        packages: cart,
        totalTravelers,
        totalAmount: finalBookingAmount,
      };

      // Executes POST request with token injected via api.js
      const response = await createBooking(payload);
      console.log("📥 [API POST] Booking submitted successfully:", response.data);

      // Generate a live ticket object to display on screen
      const ticketData = {
        bookingId: "TRV-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
        packages: cart,
        travelers: totalTravelers,
        totalAmount: finalBookingAmount,
      };

      setConfirmedTicket(ticketData);
    } catch (err) {
      console.error("❌ API POST Error:", err);
      setErrorMessage(err.message || "Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !confirmedTicket) {
    return (
      <section className="checkout" style={{ textAlign: "center", padding: "50px" }}>
        <div className="checkout-card">
          <h3>Please add a package to continue</h3>
          <button onClick={() => navigate("/")} style={{ marginTop: "15px", padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Explore Packages
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout" style={{ maxWidth: "600px", margin: "30px auto", padding: "20px" }}>
      <div className="checkout-heading" style={{ textAlign: "center", marginBottom: "20px" }}>
        <p style={{ color: "#666", fontSize: "12px", fontWeight: "bold" }}>BOOKING SUMMARY</p>
        <h2>Checkout & Confirmation</h2>
      </div>

      <div className="checkout-card" style={{ background: "#fff", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        {!confirmedTicket ? (
          <>
            <h3>Review Your Booking</h3>
            {cart.map((item) => (
              <div className="checkout-package" key={item.id} style={{ margin: "10px 0", paddingBottom: "10px", borderBottom: "1px solid #f0f0f0" }}>          
                <strong>{item.title || item.name}</strong>
                <p style={{ fontSize: "13px", color: "#666" }}>{item.duration}</p>
              </div>
            ))}

            <div className="checkout-summary" style={{ margin: "20px 0", fontSize: "14px" }}>
              <p style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
                <span>Travelers</span>
                <strong>{totalTravelers}</strong>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
                <span>Package Cost</span>
                <strong>₹{packageCost.toLocaleString("en-IN")}</strong>
              </p>
              {discount > 0 && (
                <p style={{ display: "flex", justifyContent: "space-between", margin: "6px 0", color: "green" }}>
                  <span>Discount</span>
                  <strong>- ₹{discount.toLocaleString("en-IN")}</strong>
                </p>
              )}
              <p style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
                <span>Taxes (18% GST)</span>
                <strong>₹{taxes.toLocaleString("en-IN")}</strong>
              </p>
              <div className="final-total" style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "10px", borderTop: "2px solid #ddd", fontSize: "16px" }}>
                <span>Final Amount</span>
                <strong style={{ color: "#2b8a3e" }}>₹{finalBookingAmount.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}

            <button 
              onClick={handleConfirmAndPost}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2b8a3e",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "15px"
              }}
            >
              {loading ? "Processing Secure Booking..." : "Confirm & Book Now (POST)"}
            </button>
          </>
        ) : (
          /* --- GENERATED TICKET VIEW --- */
          <div className="success-card" style={{ border: "2px dashed #28a745", padding: "20px", borderRadius: "8px", background: "#f8fff9" }}>
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <span style={{ fontSize: "30px" }}>🎉</span>
              <h3 style={{ color: "#2b8a3e", margin: "5px 0" }}>Booking Confirmed & Saved!</h3>
              <p style={{ fontSize: "12px", color: "#666" }}>Your official travel pass has been generated.</p>
            </div>

            <div style={{ background: "#fff", padding: "15px", borderRadius: "6px", border: "1px solid #d4edda", fontSize: "14px" }}>
              <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Booking Reference ID:</span>
                <strong style={{ color: "#0056b3" }}>{confirmedTicket.bookingId}</strong>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Booking Date:</span>
                <strong>{confirmedTicket.date}</strong>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Total Travelers:</span>
                <strong>{confirmedTicket.travelers}</strong>
              </p>
              <hr style={{ border: "0", borderTop: "1px dashed #ccc", margin: "10px 0" }} />
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Booked Packages:</p>
              {confirmedTicket.packages.map((item) => (
                <p key={item.id} style={{ margin: "3px 0", color: "#444" }}>
                  • {item.title || item.name} ({item.duration})
                </p>
              ))}
              <hr style={{ border: "0", borderTop: "1px dashed #ccc", margin: "10px 0" }} />
              <p style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "bold", color: "#2b8a3e" }}>
                <span>Total Paid:</span>
                <span>₹{confirmedTicket.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </p>
            </div>

            <button 
              onClick={() => {
                setConfirmedTicket(null);
                navigate("/");
              }}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Book Another Journey
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Checkout;