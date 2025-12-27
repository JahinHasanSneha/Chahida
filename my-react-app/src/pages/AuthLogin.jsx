import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDB } from "../lib/db";
import { useAuth } from "../context/AuthContext";

export default function AuthLogin(){
  const { login } = useAuth();
  const nav = useNavigate();
  const db = useMemo(() => getDB(), []);
  const [email, setEmail] = useState(db.users[0]?.email || "");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (!email.trim()) return;
    try {
      // if password provided, perform backend auth
      if (password) {
        await login(email.trim(), password);
      } else {
        // fallback to mock/local login
        login(email.trim());
      }
      nav("/");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Login failed");
    }
  };

  return (
    <div className="card" style={{ padding: 18, maxWidth: 640, margin:"0 auto" }}>
      <h2 style={{ margin:0, letterSpacing:"-0.02em" }}>Login</h2>
      <div className="muted small" style={{ marginTop: 6 }}>
        Sign in with email and password, or use mock login without a password.
      </div>
      <div className="hr" />

      <label className="small muted">Email</label>
      <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@uni.edu" />

      <label className="small muted">Password</label>
      <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••" />

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
