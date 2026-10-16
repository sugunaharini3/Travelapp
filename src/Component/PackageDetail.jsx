// src/components/PackageDetail.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bookingSlice";
import usePackages from "../hooks/usePackages";

function PackageDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Get all packages directly from your API hook
  const { allPackages, loading } = usePackages();
  const selectedPackage = allPackages.find((pkg) => String(pkg.id) === String(id));

  if (loading) {
    return (
      <section className="detail-page" style={{ textAlign: "center", padding: "60px" }}>
        <h2>Loading package details...</h2>
      </section>
    );
  }

  if (!selectedPackage) {
    return (
      <section className="detail-page" style={{ textAlign: "center", padding: "60px" }}>
        <h2>Package not found</h2>
        <Link to="/packages" style={{ color: "#007BFF", textDecoration: "none", fontWeight: "bold" }}>← Back to Packages</Link>
      </section>
    );
  }

  return (
    <section className="detail-page" style={{ maxWidth: "850px", margin: "30px auto", padding: "0 20px" }}>
      <div className="detail-page-content" style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
        
        {/* Package Image */}
        <img
          src={selectedPackage.image}
          alt={selectedPackage.destination}
          style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
        />

        {/* Badge & Rating */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ background: "#e7f5ff", color: "#1971c2", padding: "4px 12px", borderRadius: "4px", fontSize: "13px", fontWeight: "bold" }}>
            {selectedPackage.type}
          </span>
          <span style={{ fontSize: "15px", color: "#f59f00", fontWeight: "bold" }}>
            ⭐ {selectedPackage.rating} / 5.0
          </span>
        </div>

        <h1 style={{ margin: "5px 0 10px 0", color: "#212529" }}>{selectedPackage.name}</h1>
        <p style={{ color: "#666", fontSize: "15px", marginBottom: "20px" }}>📍 {selectedPackage.destination} &bull; ⏱️ {selectedPackage.duration}</p>

        {/* Overview Description */}
        <div style={{ marginBottom: "25px", lineHeight: "1.6", color: "#495057" }}>
          <h3 style={{ borderBottom: "2px solid #e9ecef", paddingBottom: "8px", color: "#343a40" }}>Tour Overview</h3>
          <p>{selectedPackage.description}</p>
        </div>

        {/* Day-by-Day Itinerary */}
        {selectedPackage.itinerary && (
          <div style={{ marginBottom: "25px" }}>
            <h3 style={{ borderBottom: "2px solid #e9ecef", paddingBottom: "8px", color: "#343a40" }}>Day-by-Day Itinerary</h3>
            <ul style={{ paddingLeft: "20px", margin: "12px 0", color: "#495057", lineHeight: "1.8" }}>
              {selectedPackage.itinerary.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* What's Included */}
        {selectedPackage.inclusions && (
          <div style={{ marginBottom: "25px" }}>
            <h3 style={{ borderBottom: "2px solid #e9ecef", paddingBottom: "8px", color: "#343a40" }}>What's Included</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
              {selectedPackage.inclusions.map((inc, idx) => (
                <div key={idx} style={{ background: "#f8f9fa", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#2b8a3e", fontWeight: "500" }}>
                  ✓ {inc}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action & Pricing Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px", borderTop: "1px solid #dee2e6", paddingTop: "20px" }}>
          <div>
            <span style={{ display: "block", fontSize: "13px", color: "#6c757d" }}>Total Package Cost</span>
            <strong style={{ fontSize: "24px", color: "#2b8a3e" }}>₹{selectedPackage.price.toLocaleString("en-IN")}</strong>
          </div>
          <button
            onClick={() => {
              dispatch(addToCart(selectedPackage));
              alert("Package added to your booking cart!");
            }}
            style={{ padding: "12px 24px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}
          >
            Add to Cart
          </button>
        </div>
        
        <div style={{ marginTop: "20px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#007BFF", fontWeight: "500" }}>← Back to Packages</Link>
        </div>
      </div>
    </section>
  );
}

export default PackageDetail;