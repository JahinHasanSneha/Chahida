import React, { useMemo, useState } from "react";
import { getDB } from "../lib/db";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import { META } from "../data/seed";

export default function Directory(){
  const db = useMemo(() => getDB(), []);
  const [q, setQ] = useState("");
  const [hall, setHall] = useState("All");
  const [donorsOnly, setDonorsOnly] = useState(true);

  const users = useMemo(() => {
    let list = db.users;
    if(donorsOnly) list = list.filter(u => u.donorOptIn);
    if(hall !== "All") list = list.filter(u => u.hall === hall);

    if(q.trim()){
      const qq = q.toLowerCase();
      list = list.filter(u => (
        `${u.name} ${u.studentId} ${u.hall} ${u.room} ${u.email} ${u.mobile} ${u.bloodGroup} ${u.levelTerm}`
          .toLowerCase().includes(qq)
      ));
    }
    return list.slice(0, 80);
  }, [db.users, q, hall, donorsOnly]);

  return (
    <div className="vstack">
      <div className="card" style={{ padding: 16 }}>
        <div className="hstack" style={{ justifyContent:"space-between", flexWrap:"wrap" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, letterSpacing:"-0.02em" }}>Directory</div>
            <div className="muted small" style={{ marginTop: 6 }}>
              Search students + donors by blood group, hall, level-term, name, ID…
            </div>
          </div>
          <div className="hstack">
            <label className="badge" style={{ gap: 10, fontWeight: 900 }}>
              <input type="checkbox" checked={donorsOnly} onChange={(e)=>setDonorsOnly(e.target.checked)} />
              Donors only
            </label>
          </div>
        </div>

        <div className="hr" />

        <div className="hstack" style={{ flexWrap:"wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <SearchBar value={q} onChange={setQ} placeholder="Try: B+, O-, Nazrul Hall, L2T1, 2021-…" />
          </div>
          <select className="input" style={{ width: 240 }} value={hall} onChange={(e)=>setHall(e.target.value)}>
            <option value="All">All halls</option>
            {META.HALLS.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          <button className="btn" onClick={()=>{ setQ(""); setHall("All"); }} style={{ fontWeight: 900 }}>Reset</button>
        </div>
      </div>

      {users.length === 0 ? (
        <EmptyState title="No matches" hint="Try searching a blood group like B+ or hall name." />
      ) : (
        <div className="card" style={{ padding: 14 }}>
          <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {users.map(u => (
              <div key={u.id} className="soft" style={{ padding: 12 }}>
                <div className="hstack" style={{ justifyContent:"space-between" }}>
                  <div style={{ fontWeight: 900 }}>{u.name}</div>
                  <span className="badge" style={{ fontWeight: 900, borderColor:"rgba(239,68,68,0.25)" }}>
                    {u.bloodGroup} {u.donorOptIn ? "• Donor" : ""}
                  </span>
                </div>
                <div className="muted small" style={{ marginTop: 6 }}>
                  {u.studentId} • {u.levelTerm}
                </div>
                <div className="muted small" style={{ marginTop: 4 }}>
                  {u.hall} • Room {u.room}
                </div>
                <div className="hr" />
                <div className="muted small">Email: <b>{u.email}</b></div>
                <div className="muted small">Mobile: <b>{u.mobile}</b></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
