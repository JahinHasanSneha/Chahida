import React from "react";

const palette = {
  "Emergency Blood": ["rgba(239,68,68,0.12)", "rgba(239,68,68,0.35)"],
  "Lost & Found": ["rgba(245,158,11,0.10)", "rgba(245,158,11,0.35)"],
  "Appliance": ["rgba(16,185,129,0.10)", "rgba(16,185,129,0.35)"],
  "Medicine": ["rgba(236,72,153,0.10)", "rgba(236,72,153,0.35)"],
  "Academic": ["rgba(37,99,235,0.10)", "rgba(37,99,235,0.35)"],
  "Buy & Sell": ["rgba(124,58,237,0.10)", "rgba(124,58,237,0.35)"],
  "Find a Buddy": ["rgba(14,165,233,0.10)", "rgba(14,165,233,0.35)"],
};

export default function TagPill({ tag }){
  const [bg, bd] = palette[tag] || ["rgba(11,18,32,0.06)", "rgba(11,18,32,0.14)"];
  return (
    <span className="badge" style={{ background:bg, borderColor: bd, fontWeight: 700 }}>
      {tag}
    </span>
  );
}
