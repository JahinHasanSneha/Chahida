import React from "react";

export default function Modal({ open, title, children, onClose }){
  if(!open) return null;
  return (
    <div
      style={{
        position:"fixed", inset:0, background:"rgba(11,18,32,0.35)",
        display:"grid", placeItems:"center", padding: 18, zIndex: 50
      }}
      onMouseDown={onClose}
    >
      <div className="card" style={{ width:"min(680px, 94vw)", padding: 16 }} onMouseDown={(e)=>e.stopPropagation()}>
        <div className="hstack" style={{ justifyContent:"space-between" }}>
          <div style={{ fontWeight: 800, letterSpacing:"-0.02em" }}>{title}</div>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        <div className="hr" />
        {children}
      </div>
    </div>
  );
}
