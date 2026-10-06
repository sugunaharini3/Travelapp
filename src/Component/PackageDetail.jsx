
import { Link, useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
function PackageDetail() {
  const { id } = useParams();
  const { allPackages, addToCart } = useBooking();
  const selectedPackage = allPackages.find(
    (pkg) => String(pkg.id) === id
  );
  if (!selectedPackage) {
    return (
      <section className="detail-page">
        <h2>Package not found</h2>
        <Link to="/packages">Back to Packages</Link>
      </section>
    );
  }
  return (
    <section className="detail-page">
      <div className="detail-page-content">
        <img
          src={selectedPackage.image}
          alt={selectedPackage.destination}/>
        <span className="detail-type">{selectedPackage.type}</span>
        <h1>{selectedPackage.name}</h1>
        <p>📍 {selectedPackage.destination}</p>
        <div className="detail-info-grid">
          <p><strong>Duration:</strong> {selectedPackage.duration}</p>
          <p><strong>Rating:</strong> ⭐ {selectedPackage.rating}</p>
          <p>
            <strong>Highlights:</strong>{" "}
            {selectedPackage.highlights.join(", ")}
          </p>
        </div>
        <div className="detail-modal-bottom">
          <div>
            <span>Starting from</span>
            <strong>₹{selectedPackage.price}</strong>
          </div>
          <button
            className="primary-btn"
            onClick={() => addToCart(selectedPackage)}
          >Add to Cart
          </button>
        </div>
        <Link to="/packages">← Back to Packages</Link>
      </div>
    </section>
  );
}
export default PackageDetail;