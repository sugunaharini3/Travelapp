import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function PackageCard({ packageData }) {
  const { addToCart } = useBooking();

  return (
    <div className="package-card">
      <div className="package-image">
        <img
          src={packageData.image}
          alt={packageData.destination}
        />
        <span className="package-type">
          {packageData.type}
        </span>
      </div>

      <div className="package-content">
        <h3>{packageData.name}</h3>
        <p className="destination">
          📍 {packageData.destination}
        </p>
        <p className="duration">
          🗓️ {packageData.duration}
        </p>

        <div className="package-rating">
          ⭐ {packageData.rating}
        </div>

        <div className="highlights">
          {packageData.highlights.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>

        <div className="package-bottom">
          <div>
            <p className="price-label">Starting from</p>
            <p className="price">₹{packageData.price}</p>

            {packageData.internationalPrice && (
              <p className="international-price">
                ≈ ${packageData.internationalPrice}
              </p>
            )}
          </div>

          <div className="card-buttons">
            <Link
              to={`/package/${packageData.id}`}
              className="secondary-btn"
            >
              View Details
            </Link>

            <button
              className="primary-btn small-btn"
              onClick={() => addToCart(packageData)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;