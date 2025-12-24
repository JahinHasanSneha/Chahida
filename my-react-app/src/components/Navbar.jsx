import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getDB } from "../lib/db";
import { searchAll } from "../lib/search";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import TagPill from "./TagPill";
import { useAuth } from "../context/AuthContext";
import { initials } from "../lib/utils";

const nav = [
  ["Home","/"],
  ["Directory","/directory"],
  ["Lost & Found","/lost-found"],
  ["Buy & Sell","/buy-sell"],
  ["Buddy","/buddy"],
  ["Create","/create"],
];

export default function Navbar(){
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthed, logout } = useAuth();

  const db = useMemo(() => getDB(), []);
  const results = useMemo(() => {
    const { posts, users } = searchAll({ query: q, posts: db.posts, users: db.users });
    return { posts: posts.slice(0, 8), users: users.slice(0, 6) };
  }, [q, db.posts, db.users]);

  return (
    <div style={{ position:"sticky", top:0, zIndex: 20, backdropFilter:"blur(10px)" }}>
      <div style={{ borderBottom:"1px solid rgba(11,18,32,0.08)", background:"rgba(255,255,255,0.7)" }}>
        <div className="container" style={{ padding:"12px 0" }}>
          <div className="hstack" style={{ justifyContent:"space-between" }}>
            <div className="hstack" style={{ gap: 14 }}>
              <Link to="/" className="hstack" style={{ gap:10 }}>
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(16,185,129,0.85))",
                    boxShadow: "0 12px 30px rgba(37,99,235,0.18)"
                  }}
                />
                <div>
                  <div style={{ fontWeight: 900, letterSpacing:"-0.03em" }}>Campus Hub</div>
                  <div className="muted small" style={{ marginTop: 1 }}>Blood • Lost • Academic • Marketplace</div>
                </div>
              </Link>

              <div style={{ width: "min(520px, 40vw)" }}>
                <div onClick={()=>setOpen(true)}>
                  <SearchBar value={q} onChange={setQ} placeholder="Search everything…" />
                </div>
              </div>
            </div>

            <div className="hstack" style={{ gap: 10 }}>
              {nav.map(([label, href]) => (
                <NavLink
                  key={href}
                  to={href}
                  className="btn"
                  style={({ isActive }) => ({
                    fontWeight: 800,
                    borderColor: isActive ? "rgba(37,99,235,0.28)" : "rgba(11,18,32,0.10)",
                    background: isActive ? "rgba(37,99,235,0.06)" : "white"
                  })}
                >
                  {label}
                </NavLink>
              ))}

              {!isAuthed ? (
                <button className="btn btnPrimary" onClick={()=>navigate("/login")} style={{ fontWeight: 900 }}>
                  Login
                </button>
              ) : (
                <div className="hstack">
                  <Link to="/profile" className="btn" style={{ fontWeight: 900 }}>
                    <span className="badge" style={{ fontWeight: 900, borderColor:"rgba(37,99,235,0.25)" }}>
                      {initials(user?.name)} • {user?.hall?.split(" ")[0]}
                    </span>
                  </Link>
                  <button className="btn" onClick={logout} style={{ fontWeight: 800 }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} title="Search Campus Hub" onClose={()=>setOpen(false)}>
        <div className="vstack">
          <SearchBar value={q} onChange={setQ} placeholder="Try: A+ / CSE110 / Nazrul Hall / wallet / iron / tutor…" />

          <div className="grid" style={{ marginTop: 6 }}>
            <div className="vstack">
              <div className="muted small" style={{ fontWeight: 800 }}>Posts</div>
              {results.posts.length === 0 ? (
                <div className="muted small">No posts found.</div>
              ) : (
                results.posts.map(p => (
                  <div
                    key={p.id}
                    className="soft"
                    style={{ padding: 12, cursor:"pointer" }}
                    onClick={() => { setOpen(false); navigate(`/post/${p.id}`); }}
                  >
                    <div className="hstack" style={{ justifyContent:"space-between" }}>
                      <TagPill tag={p.tag} />
                      <span className="badge" style={{ fontWeight: 800 }}>{p.status}</span>
                    </div>
                    <div style={{ marginTop: 8, fontWeight: 900 }}>{p.title}</div>
                    <div className="muted small" style={{ marginTop: 4 }}>{p.location?.hall} • {p.location?.spot}</div>
                  </div>
                ))
              )}
            </div>

            <div className="vstack">
              <div className="muted small" style={{ fontWeight: 800 }}>People</div>
              {results.users.length === 0 ? (
                <div className="muted small">No users found.</div>
              ) : (
                results.users.map(u => (
                  <div key={u.id} className="soft" style={{ padding: 12 }}>
                    <div className="hstack" style={{ justifyContent:"space-between" }}>
                      <div style={{ fontWeight: 900 }}>{u.name}</div>
                      <span className="badge" style={{ fontWeight: 900 }}>
                        {u.bloodGroup} {u.donorOptIn ? "• Donor" : ""}
                      </span>
                    </div>
                    <div className="muted small" style={{ marginTop: 4 }}>
                      {u.hall} • Room {u.room} • {u.levelTerm}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="muted small">Tip: Search understands blood groups, course codes, halls, items, and keywords.</div>
        </div>
      </Modal>
    </div>
  );
}
