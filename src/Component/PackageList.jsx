import { useBooking } from "../context/BookingContext";
import PackageCard from "./PackageCard";

function PackageList() {
  const { filteredPackages, allPackages } = useBooking();
  return (
    <section id="packages" className="package-list-section">
      <div className="section-heading">
        <p>OUR TRAVEL COLLECTION</p>
        <h2>Explore Our Packages</h2>
        <span>
          Discover carefully selected journeys across India
          and the world.
        </span>
      </div>

      <div className="package-grid">
        {allPackages.length === 0 ? (
          <p className="package-message">No packages available</p>
        ) : filteredPackages.length === 0 ? (
          <p className="package-message">
            No travel packages found
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