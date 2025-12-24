import React from "react";

export default function Buddy(){
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18 }}>Find a Buddy</div>
      <div className="muted small" style={{ marginTop: 6 }}>
        Open buddy posts here: <b>/category/Find%20a%20Buddy</b>
      </div>
      <div className="hr" />
      <div className="muted small">Search examples: “study buddy”, “gym”, “DSA”, “IELTS”.</div>
    </div>
  );
}
