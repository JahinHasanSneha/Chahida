import React from "react";
import StudyBuddyFinder from "./buddyFinder";
export default function Buddy(){
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18 }}></div>
      <div className="muted small" style={{ marginTop: 6 }}>
        <StudyBuddyFinder/>
      </div>
      <div className="hr" />
      <div className="muted small">Search examples: “gym”, “DSA”, “IELTS”.</div>
    </div>
  );
}
