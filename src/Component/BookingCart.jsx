// src/components/BookingCart.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  clearCart,
  selectBookingSummary,
} from "../redux/bookingSlice";
import { getCurrentToken, logoutUser } from "../services/authApi";

function BookingCart({ cartOpen, setCartOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull cart items directly from Redux store
  const cartItems = useSelector((state) => state.booking.cart);
  
  // Pull financial breakdown
  const { subtotal, discount, tax, finalTotal } = useSelector(selectBookingSummary);

  const goToCheckout = () => {
    // Check authentication token before allowing checkout access (Experiment 4 requirement)
    const token = getCurrentToken();
    if (!token || token === "expired_token") {
      alert("Please log in to proceed to checkout and secure your booking.");
      logoutUser();
      setCartOpen(false);
      navigate("/login", { state: { from: { pathname: "/booking" } } });
      return;
    }

    setCartOpen(false);
    navigate("/booking");
    setTimeout(() => {
      document
        .getElementById("traveler-details-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    }, 150);
  };

  if (!cartOpen) {
    return null;
  }

  return (
    <>
      <div
        className="cart-overlay"
        onClick={() => setCartOpen(false)}
      ></div>

      <aside className="cart-drawer">
        <div className="cart-drawer-header">
          <div>
            <p>YOUR JOURNEY</p>
            <h2>Booking Cart</h2>
          </div>

          <button
            className="cart-close"
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">
            Your booking cart is empty
          </p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <div>
                    <h3>{item.name}</h3>
                    <p>📍 {item.destination}</p>
                    <p>🗓️ {item.duration}</p>
                    <p>👥 Travelers: {item.travelers || 1}</p>
                  </div>

                  <div className="cart-actions">
                    <strong>₹{(item.price * (item.travelers || 1)).toLocaleString("en-IN")}</strong>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Calculations Summary Box */}
            <div style={{ padding: "12px", background: "#f8f9fa", margin: "10px 0", borderRadius: "6px", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>Subtotal:</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "green" }}>
                  <span>Discount (10%):</span>
                  <strong>-₹{discount.toLocaleString("en-IN")}</strong>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>Tax (18% GST):</span>
                <strong>+₹{tax.toLocaleString("en-IN")}</strong>
              </div>
              <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "#2b8a3e" }}>
                <span>Final Total:</span>
                <strong>₹{finalTotal.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <div className="cart-footer-actions">
              <button
                className="secondary-btn"
                onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>

              <button
                className="primary-btn"
                onClick={goToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default BookingCart;