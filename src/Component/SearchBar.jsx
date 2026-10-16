// src/components/SearchBar.jsx
import React from "react";
import { useBooking } from "../context/BookingContext";

function SearchBar() {
  const {
    search,
    setSearch,
    filteredPackages
  } = useBooking();

  const handleSearch = () => {
    document.getElementById("packages")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="search-section">
      <div className="search-content">
        <p>PLAN YOUR NEXT JOURNEY</p>
        <h2>Find Your Destination</h2>

        <div className="search-bar">
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search for a destination or package..."
          />

          <button
            className="primary-btn search-btn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <span className="search-result-count">
          {filteredPackages.length} package
          {filteredPackages.length !== 1 ? "s" : ""} found
        </span>
      </div>
    </section>
  );
}

export default SearchBar;