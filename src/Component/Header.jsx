import { useBooking } from "../context/BookingContext";
import { Link } from "react-router-dom";
function Header() {
  const { cartItems, setCartOpen } = useBooking();
  return (
    <header className="header">
      <div className="logo">Beyond Horizons</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/booking">Booking</Link>
        <button className="cart-button"
          onClick={() => setCartOpen(true)}
        >🛒 Cart ({cartItems.length})
        </button>
      </nav>
    </header>
  );
}
export default Header;