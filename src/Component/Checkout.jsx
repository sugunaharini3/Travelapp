import { useBooking } from "../context/BookingContext";
function Checkout() {
  const {
    cartItems,
    bookingDetails,
    travelers,
    travelDates,
    tripDuration,
    packageCost,
    discount,
    taxes,
    finalBookingAmount
  } = useBooking();
  if (cartItems.length === 0) {
    return (
      <section className="checkout">
        <div className="checkout-card">
          <h3>
            Please add a package to continue</h3>
        </div>
      </section>
    );
  }
  return (
    <section className="checkout">
      <div className="checkout-heading">
        <p>BOOKING SUMMARY</p>
        <h2>Checkout</h2>
      </div>
      <div className="checkout-card">
        {!bookingDetails ? (
          <><h3>Review Your Booking</h3>
           {cartItems.map((item) => (
              <div
                className="checkout-package"
                key={item.id}>              
                <strong>{item.name}</strong>
                <span>{item.duration}</span>
              </div>
            ))}
            <div className="checkout-summary">
              <p>
                <span>Travel Dates</span>
                <strong>
                  {travelDates.start || "Not selected"}
                  {" → "}
                  {travelDates.end || "Not selected"}
                </strong>
              </p>
              <p>
                <span>Trip Duration</span>
                <strong>
                  {tripDuration} days
                </strong>
              </p>
              <p>
                <span>Travelers</span>
                <strong>{travelers}</strong>
              </p>
              <p>
                <span>Package Cost</span>
                <strong>
                  ₹{packageCost.toLocaleString("en-IN")}
                </strong>
              </p>
              <p>
                <span>Discount</span>
                <strong>
                  - ₹{discount.toLocaleString("en-IN")}
                </strong>
              </p>
              <p>
                <span>Taxes</span>
                <strong>
                  ₹{taxes.toLocaleString("en-IN")}
                </strong>
              </p>
              <div className="final-total">
                <span>Final Amount</span>
                <strong>
                  ₹{finalBookingAmount.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
            <p className="checkout-note">
              Complete your traveler details and payment
              to confirm the booking.
            </p>
          </>
        ) : (
          <div className="success-card">
            <div className="success-icon"> ✓ </div>
            <h3>Booking Confirmed!</h3>
            <p>Your journey has been successfully booked.</p>
            {bookingDetails.packages.map((item) => (
              <p key={item.id}>
                <strong>{item.name}</strong>
              </p>
            ))}
            <p>
              Traveler:{" "}
              {bookingDetails.travelerDetails.name}
            </p>
            <p>
              Travelers:{" "}
              {bookingDetails.travelers}
            </p>
            <h3>₹{bookingDetails.totalAmount.toLocaleString( "en-IN")}
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
export default Checkout;