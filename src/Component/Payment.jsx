
import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

function Payment() {
  const {
    cartItems,
    finalBookingAmount,
    paymentMethod,
    setPaymentMethod,
    confirmBooking,
    travelerDetails,
    travelDates
  } = useBooking();

  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");
  const [error, setError] = useState("");

  if (cartItems.length === 0) {
    return null;
  }

  const handlePayment = () => {
    setError("");

    if (
      !travelerDetails.name ||
      !travelerDetails.email ||
      travelerDetails.phone.length !== 10
    ) {
      setError("Please complete your traveler details before payment.");
      return;
    }

    if (!travelDates.start || !travelDates.end) {
      setError("Please select a travel start date.");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (
      paymentMethod === "UPI" &&
      !upiId.includes("@")
    ) {
      setError("Please enter a valid UPI ID.");
      return;
    }

    if (
      paymentMethod === "Credit / Debit Card" &&
      (
        cardNumber.length !== 16 ||
        expiry.length !== 5 ||
        cvv.length !== 3
      )
    ) {
      setError("Please enter valid card details.");
      return;
    }

    if (
      paymentMethod === "Net Banking" &&
      !bank
    ) {
      setError("Please select your bank.");
      return;
    }

    const success = confirmBooking();

    if (success) {
      navigate("/checkout");
    } else {
      setError("Please complete all required booking details.");
    }
  };

  return (
    <section className="payment">
      <div className="payment-heading">
        <p>SECURE PAYMENT</p>
        <h2>Complete Your Payment</h2>
      </div>

      <div className="payment-card">
        <div className="payment-total">
          <span>Total Amount</span>
          <strong>
            ₹{finalBookingAmount.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(event) => {
              setPaymentMethod(event.target.value);
              setError("");
            }}
          >
            <option value="">Select Payment Method</option>
            <option value="UPI">UPI</option>
            <option value="Credit / Debit Card">Credit / Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        {paymentMethod === "UPI" && (
          <div className="payment-fields">
            <div className="form-group">
              <label>UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(event) => setUpiId(event.target.value)}
                placeholder="example@upi"
              />
            </div>
          </div>
        )}

        {paymentMethod === "Credit / Debit Card" && (
          <div className="payment-fields">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength="16"
                value={cardNumber}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  if (value.length <= 16) {
                    setCardNumber(value);
                  }
                }}
                placeholder="16-digit card number"
              />
            </div>

            <div className="payment-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  maxLength="5"
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value)}
                  placeholder="MM/YY"
                />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength="3"
                  value={cvv}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "");
                    if (value.length <= 3) {
                      setCvv(value);
                    }
                  }}
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "Net Banking" && (
          <div className="payment-fields">
            <div className="form-group">
              <label>Select Bank</label>
              <select
                value={bank}
                onChange={(event) => setBank(event.target.value)}
              >
                <option value="">Select Bank</option>
                <option>SBI</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          </div>
        )}

        {error && (
          <p className="payment-error">{error}</p>
        )}

        <button
          className="primary-btn payment-btn"
          onClick={handlePayment}
        >
          Pay ₹{finalBookingAmount.toLocaleString("en-IN")}
        </button>
      </div>
    </section>
  );
}

export default Payment;