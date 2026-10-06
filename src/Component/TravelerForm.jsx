
import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

function TravelerForm() {
  const {
    cartItems,
    travelers,
    updateTravelers,
    travelerDetails,
    setTravelerDetails,
    travelDates,
    updateTravelDates
  } = useBooking();

  const navigate = useNavigate();
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("");
  const selectedPackage = cartItems[0];

  const getPackageDays = () => {
    if (!selectedPackage) {
      return 0;
    }
    return parseInt(selectedPackage.duration);
  };

  useEffect(() => {
    if (!travelDates.start || !selectedPackage) {
      updateTravelDates(travelDates.start, "");
      return;
    }

    const days = getPackageDays();
    if (!days) {
      return;
    }

    const startDate = new Date(travelDates.start);
    startDate.setDate(startDate.getDate() + days - 1);

    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");

    updateTravelDates(
      travelDates.start,
      `${year}-${month}-${day}`
    );
  }, [travelDates.start, selectedPackage]);

  if (cartItems.length === 0) {
    return null;
  }

  const handleChange = (event) => {
    setTravelerDetails({
      ...travelerDetails,
      [event.target.name]: event.target.value
    });
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setTravelerDetails({
        ...travelerDetails,
        phone: value
      });

      setPhoneError(
        value.length > 0 && value.length !== 10
          ? "Phone number must contain exactly 10 digits."
          : ""
      );
    }
  };

  const handleContinue = () => {
    setError("");

    if (
      !travelerDetails.name ||
      !travelerDetails.email ||
      travelerDetails.phone.length !== 10
    ) {
      setError("Please complete all traveler details.");
      return;
    }

    if (!travelDates.start || !travelDates.end) {
      setError("Please select your travel start date.");
      return;
    }

    navigate("/payment");
  };

  return (
    <section
      id="traveler-details-section"
      className="traveler-form"
    >
      <div className="form-heading">
        <p>TRAVEL INFORMATION</p>
        <h2>Traveler Details</h2>
        <span>Booking: {selectedPackage.name}</span>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={travelerDetails.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={travelerDetails.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength="10"
            value={travelerDetails.phone}
            onChange={handlePhoneChange}
            placeholder="10-digit phone number"
          />
          {phoneError && (
            <small className="input-error">{phoneError}</small>
          )}
        </div>

        <div className="form-group">
          <label>Number of Travelers</label>
          <input
            type="number"
            min="1"
            value={travelers}
            onChange={(event) =>
              updateTravelers(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Travel Start Date</label>
          <input
            type="date"
            value={travelDates.start}
            onChange={(event) =>
              updateTravelDates(event.target.value, "")
            }
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="form-group">
          <label>Travel End Date</label>
          <input
            type="date"
            value={travelDates.end}
            readOnly
          />
          <small className="date-note">
            Automatically calculated for {getPackageDays()} days.
          </small>
        </div>
      </div>

      {error && (
        <p className="payment-error">{error}</p>
      )}

      <button
        className="primary-btn"
        onClick={handleContinue}
      >
        Continue to Payment
      </button>
    </section>
  );
}

export default TravelerForm;