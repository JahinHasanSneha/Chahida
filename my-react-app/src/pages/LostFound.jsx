import React from "react";
import Category from "./Category";

export default function LostFound(){
  // This page exists so Navbar link feels polished.
  // It relies on Category route; but we keep a dedicated page.
  return <CategoryWrapper tag="Lost & Found" />;
}

function CategoryWrapper({ tag }){
  // redirect-like UI (simple)
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18 }}>Lost & Found</div>
      <div className="muted small" style={{ marginTop: 6 }}>
        Open the Lost & Found category from quick links: <b>/category/Lost%20%26%20Found</b>
      </div>
      <div className="hr" />
      <div className="muted small">
        Tip: For demo, search “ID Card”, “keys”, “wallet”, “USB”.
      </div>
    </div>
  );
}
