import React from "react";

export default function EmptyState({ title="Nothing here yet", hint="Try changing filters or searching something else." }){
  return (
    <div className="soft" style={{ padding: 18, borderRadius: 18 }}>
      <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
      <div className="muted small" style={{ marginTop: 6 }}>{hint}</div>
    </div>
  );
}
