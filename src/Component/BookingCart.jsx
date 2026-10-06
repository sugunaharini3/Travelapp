import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
function BookingCart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    cartOpen,
    setCartOpen
  } = useBooking();
const navigate = useNavigate();
  const goToCheckout = () => {
    setCartOpen(false);
    navigate("/booking")
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
                  </div>

                  <div className="cart-actions">
                    <strong>₹{item.price}</strong>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer-actions">
              <button
                className="secondary-btn"
                onClick={clearCart}
              >
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