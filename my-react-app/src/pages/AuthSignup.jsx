import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { upsertUser } from "../lib/db";
import { META } from "../data/seed";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function AuthSignup(){
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    studentId: "",
    hall: META.HALLS[0],
    room: "",
    email: "",
    password: "",
    mobile: "",
    bloodGroup: "B+",
    levelTerm: "L1T1",
    donorOptIn: true,
    bio: "Hi! I’m new here 🙂",
  });

  const set = (k,v) => setForm(s => ({ ...s, [k]: v }));

  const submit = async () => {
    if(!form.name.trim() || !form.email.trim()){
      alert("Name and Email are required.");
      return;
    }

    try {
      // try backend register then backend login to obtain token
      await api.post("/api/auth/register", { name: form.name, email: form.email, password: form.password });
      await login(form.email.trim(), form.password);
      nav("/profile");
    } catch (err) {
      console.error(err);
      // fallback to local/mock behavior
      upsertUser({ ...form });
      login(form.email.trim());
      nav("/profile");
    }
  };

  return (
    <div className="card" style={{ padding: 18, maxWidth: 860, margin:"0 auto" }}>
      <h2 style={{ margin:0, letterSpacing:"-0.02em" }}>Create account</h2>
      <div className="muted small" style={{ marginTop: 6 }}>
        These fields match your hackathon story: hall, room, blood, level-term, donor opt-in.
      </div>

      <div className="hr" />

      <div className="grid">
        <div className="vstack">
          <label className="small muted">Full name</label>
          <input className="input" value={form.name} onChange={(e)=>set("name", e.target.value)} />

          <label className="small muted">Student ID</label>
          <input className="input" value={form.studentId} onChange={(e)=>set("studentId", e.target.value)} placeholder="e.g. 2021-1234" />

          <label className="small muted">Hall</label>
          <select className="input" value={form.hall} onChange={(e)=>set("hall", e.target.value)}>
            {META.HALLS.map(h => <option key={h} value={h}>{h}</option>)}
          </select>

          <label className="small muted">Room</label>
          <input className="input" value={form.room} onChange={(e)=>set("room", e.target.value)} placeholder="e.g. 312" />

          <label className="small muted">Level-Term</label>
          <input className="input" value={form.levelTerm} onChange={(e)=>set("levelTerm", e.target.value)} placeholder="e.g. L2T1" />
        </div>

        <div className="vstack">
          <label className="small muted">Email</label>
          <input className="input" value={form.email} onChange={(e)=>set("email", e.target.value)} placeholder="you@uni.edu" />

          <label className="small muted">Password</label>
          <input type="password" className="input" value={form.password} onChange={(e)=>set("password", e.target.value)} placeholder="Choose a password" />

          <label className="small muted">Mobile</label>
          <input className="input" value={form.mobile} onChange={(e)=>set("mobile", e.target.value)} placeholder="01XXXXXXXXX" />

          <label className="small muted">Blood group</label>
          <input className="input" value={form.bloodGroup} onChange={(e)=>set("bloodGroup", e.target.value)} placeholder="e.g. B+" />

          <label className="small muted">Donate blood in future?</label>
          <div className="hstack soft" style={{ padding: 12 }}>
            <input type="checkbox" checked={form.donorOptIn} onChange={(e)=>set("donorOptIn", e.target.checked)} />
            <div className="muted small">Show me in donor directory & blood search matches.</div>
          </div>

          <label className="small muted">Bio</label>
          <textarea className="input" rows={4} value={form.bio} onChange={(e)=>set("bio", e.target.value)} />
        </div>
      </div>

      <div className="hstack" style={{ justifyContent:"flex-end", marginTop: 12 }}>
        <Link to="/login" className="btn" style={{ fontWeight: 900 }}>Back to login</Link>
        <button className="btn btnPrimary" style={{ fontWeight: 900 }} onClick={submit}>Create</button>
      </div>
    </div>
  );
}
