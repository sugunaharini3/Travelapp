// src/components/PackageCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, setCartOpen } from "../redux/bookingSlice";

function PackageCard({ packageData }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(packageData));
    dispatch(setCartOpen(true)); // Opens the cart drawer automatically
  };

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
          {packageData.highlights && packageData.highlights.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className="package-bottom">
          <div>
            <p className="price-label">Starting from</p>
            <p className="price">₹{packageData.price?.toLocaleString("en-IN")}</p>
            {packageData.internationalPrice && (
              <p className="international-price">
                ≈ ${packageData.internationalPrice}
              </p>
            )}
          </div>
          <div className="card-buttons">
            <Link
              to={`/package/${packageData.id}`}
              className="secondary-btn" >
              View Details
            </Link>
            <button
              className="primary-btn small-btn"
              onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;