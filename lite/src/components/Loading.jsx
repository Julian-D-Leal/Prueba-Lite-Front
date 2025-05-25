import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}