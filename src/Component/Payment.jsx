// src/Component/Payment.jsx
import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { getCurrentToken, saveToken } from "../services/authApi";

function Payment() {
  const bookingContext = useBooking() || {};
  const {
    cartItems = [],
    travelers = 1,
    finalBookingAmount,
    paymentMethod = "UPI",
    setPaymentMethod = () => {}
  } = bookingContext;
  
  const navigate = useNavigate();

  // Local state for specific payment method details
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankName, setBankName] = useState("SBI");

  // Dynamically calculate exact total matching your cart summary
  const itemsArray = Array.isArray(cartItems) 
    ? cartItems 
    : (cartItems?.items || (cartItems ? [cartItems] : []));
  const currentPackage = itemsArray[0] || {};
  const basePrice = Number(currentPackage.price || currentPackage.cost || 48000);
  const subtotal = basePrice * (Number(travelers) || 1);
  const tax = subtotal * 0.18; // 18% GST
  const calculatedFinal = subtotal + tax;
  const displayAmount = finalBookingAmount || calculatedFinal;

  const handlePayment = () => {
    // Basic validation depending on chosen method
    if (paymentMethod === "UPI" && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }
    if (paymentMethod === "Credit / Debit Card" && (!cardNumber || !expiry || !cvv)) {
      alert("Please fill in all card details.");
      return;
    }

    let token = getCurrentToken();
    if (!token) {
      saveToken("mock-jwt-token-exp4-12345");
    }
    navigate("/checkout");
  };

  return (
    <section className="payment" style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
      <div className="payment-heading" style={{ textAlign: "center", marginBottom: "20px" }}>
        <p style={{ color: "#666", fontSize: "12px", fontWeight: "bold" }}>SECURE PAYMENT</p>
        <h2>Complete Your Payment</h2>
      </div>

      <div className="payment-card" style={{ background: "#fff", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div className="payment-total" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "18px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
          <span>Total Amount</span>
          <strong style={{ color: "#2b8a3e" }}>₹{Number(displayAmount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong>
        </div>

        {/* Payment Method Selector */}
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="UPI">UPI</option>
            <option value="Credit / Debit Card">Credit / Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        {/* --- DYNAMIC CONDITIONAL INPUT FIELDS --- */}

        {/* 1. UPI Inputs */}
        {paymentMethod === "UPI" && (
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>UPI ID / VPA</label>
            <input
              type="text"
              placeholder="e.g., username@oksbi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        )}

        {/* 2. Credit / Debit Card Inputs */}
        {paymentMethod === "Credit / Debit Card" && (
          <div style={{ marginBottom: "15px" }}>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Card Number</label>
              <input
                type="text"
                placeholder="4532 XXXX XXXX 3210"
                maxLength="19"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>CVV</label>
                <input
                  type="password"
                  placeholder="123"
                  maxLength="4"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. Net Banking Bank Selector */}
        {paymentMethod === "Net Banking" && (
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Select Your Bank</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              <option value="SBI">State Bank of India (SBI)</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="Axis">Axis Bank</option>
              <option value="Kotak">Kotak Mahindra Bank</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          className="primary-btn payment-btn"
          onClick={handlePayment}
          style={{ width: "100%", padding: "12px", backgroundColor: "#2b8a3e", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }}
        >
          Pay Now & Complete Booking
        </button>
      </div>
    </section>
  );
}

export default Payment;