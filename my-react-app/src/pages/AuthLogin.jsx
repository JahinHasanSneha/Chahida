import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDB } from "../lib/db";
import { useAuth } from "../context/AuthContext";

export default function AuthLogin(){
  const { login } = useAuth();
  const nav = useNavigate();
  const db = useMemo(() => getDB(), []);
  const [email, setEmail] = useState(db.users[0]?.email || "");

  const submit = () => {
    if(!email.trim()) return;
    login(email.trim());
    nav("/");
  };

  return (
    <div className="card" style={{ padding: 18, maxWidth: 640, margin:"0 auto" }}>
      <h2 style={{ margin:0, letterSpacing:"-0.02em" }}>Login</h2>
      <div className="muted small" style={{ marginTop: 6 }}>
        Mock auth: pick any seeded email from directory, or your own after signup.
      </div>
      <div className="hr" />

      <label className="small muted">Email</label>
      <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@uni.edu" />

      <div className="hstack" style={{ justifyContent:"flex-end", marginTop: 12 }}>
        <Link to="/signup" className="btn" style={{ fontWeight: 900 }}>Create account</Link>
        <button className="btn btnPrimary" style={{ fontWeight: 900 }} onClick={submit}>Login</button>
      </div>

      <div className="soft" style={{ padding: 12, marginTop: 12 }}>
        <div style={{ fontWeight: 900 }}>Tip</div>
        <div className="muted small" style={{ marginTop: 6 }}>
          Go to <b>Directory</b> and copy any email to login instantly for demo.
        </div>
      </div>
    </div>
  );
}
