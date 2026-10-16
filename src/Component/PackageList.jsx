// src/components/PackageList.jsx
import { useBooking } from "../context/BookingContext";
import PackageCard from "./PackageCard";

function PackageList() {
  const { filteredPackages, allPackages, loading, error } = useBooking();

  // Render Loading State
  if (loading) {
    return (
      <section id="packages" className="package-list-section" style={{ textAlign: "center", padding: "60px" }}>
        <h3>Loading travel packages from REST API...</h3>
        <p>Please wait while asynchronous data is fetched.</p>
      </section>
    );
  }

  // Render Error State
  if (error) {
    return (
      <section id="packages" className="package-list-section" style={{ textAlign: "center", padding: "60px", color: "red" }}>
        <h3>⚠️ Connection Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="primary-btn" style={{ marginTop: "15px" }}>
          Retry Request
        </button>
      </section>
    );
  }

  return (
    <section id="packages" className="package-list-section">
      <div className="section-heading">
        <p>OUR TRAVEL COLLECTION</p>
        <h2>Explore Our Packages</h2>
        <span>
          API Integrated Travel Packages with Real-Time Filtering
        </span>
      </div>
      <div className="package-grid">
        {allPackages.length === 0 ? (
          <p className="package-message">No packages available</p>
        ) : filteredPackages.length === 0 ? (
          <p className="package-message">
            No travel packages match your filter criteria
          </p>
        ) : (
          filteredPackages.map((packageData) => (
            <PackageCard
              key={packageData.id}
              packageData={packageData}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default PackageList;