import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18 }}>404</div>
      <div className="muted small" style={{ marginTop: 6 }}>This page doesn’t exist.</div>
      <div className="hr" />
      <Link to="/" className="btn btnPrimary" style={{ fontWeight: 900 }}>Back to Home</Link>
    </div>
  );
}
