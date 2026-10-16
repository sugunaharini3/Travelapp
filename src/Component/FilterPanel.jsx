// src/components/FilterPanel.jsx
import React from "react";
import { useBooking } from "../context/BookingContext";

function FilterPanel() {
  const {
    travelType,
    setTravelType,
    durationFilter,
    setDurationFilter,
    budgetFilter,
    setBudgetFilter,
    ratingFilter,
    setRatingFilter
  } = useBooking();

  return (
    <div className="filter-panel">
      <span className="filter-title">Filter By</span>

      <div className="filter-group">
        <label>Travel Type</label>
        <select
          value={travelType}
          onChange={(event) =>
            setTravelType(event.target.value)
          }>
          <option>All</option>
          <option>India</option>
          <option>International</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Duration</label>
        <select
          value={durationFilter}
          onChange={(event) =>
            setDurationFilter(event.target.value)
          }
        >
          <option>Any Duration</option>
          <option>1 - 3 Days</option>
          <option>4 - 7 Days</option>
          <option>8+ Days</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Budget</label>
        <select
          value={budgetFilter}
          onChange={(event) =>
            setBudgetFilter(event.target.value)
          }
        >
          <option>Any Budget</option>
          <option>Below ₹50,000</option>
          <option>₹50,000 - ₹1,00,000</option>
          <option>Above ₹1,00,000</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Rating</label>
        <select
          value={ratingFilter}
          onChange={(event) =>
            setRatingFilter(event.target.value)
          }>
          <option value="All Ratings">All Ratings</option>
          <option value="4.5">4.5+ ⭐</option>
          <option value="4.7">4.7+ ⭐</option>
          <option value="4.8">4.8+ ⭐</option>
          <option value="4.9">4.9+ ⭐</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;