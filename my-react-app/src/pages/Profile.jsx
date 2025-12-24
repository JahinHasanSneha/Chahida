import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getDB } from "../lib/db";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/EmptyState";
import PostCard from "../components/PostCard";

export default function Profile(){
  const { user, isAuthed } = useAuth();
  const db = useMemo(() => getDB(), []);

  if(!isAuthed){
    return <EmptyState title="Not logged in" hint="Go to Login to see your profile." />;
  }

  const myPosts = db.posts.filter(p => p.authorId === user.id).slice(0, 20);

  return (
    <div className="grid">
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900, fontSize: 18, letterSpacing:"-0.02em" }}>My Profile</div>
        <div className="muted small" style={{ marginTop: 6 }}>
          This is your campus identity for posts & matching.
        </div>

        <div className="hr" />

        <div className="vstack">
          <div className="soft" style={{ padding: 12 }}>
            <div style={{ fontWeight: 900 }}>{user.name}</div>
            <div className="muted small">{user.studentId} • {user.levelTerm}</div>
            <div className="muted small">{user.hall} • Room {user.room}</div>
            <div className="hr" />
            <div className="hstack" style={{ flexWrap:"wrap" }}>
              <span className="badge" style={{ fontWeight: 900 }}>{user.bloodGroup}</span>
              <span className="badge" style={{ fontWeight: 900 }}>
                {user.donorOptIn ? "Donor opted-in" : "Not a donor"}
              </span>
            </div>
            <div className="muted small" style={{ marginTop: 10 }}>{user.bio}</div>
          </div>

          <div className="hstack" style={{ justifyContent:"flex-end" }}>
            <Link className="btn" to="/settings" style={{ fontWeight: 900 }}>Edit settings</Link>
            <Link className="btn btnPrimary" to="/create" style={{ fontWeight: 900 }}>Create post</Link>
          </div>
        </div>
      </div>

      <div className="vstack">
        <div className="card" style={{ padding: 16 }}>
          <div className="hstack" style={{ justifyContent:"space-between" }}>
            <div style={{ fontWeight: 900 }}>My recent posts</div>
            <span className="badge" style={{ fontWeight: 900 }}>{myPosts.length}</span>
          </div>
          <div className="hr" />
          {myPosts.length===0 ? (
            <div className="muted small">No posts yet. Create your first one.</div>
          ) : (
            myPosts.map(p => <PostCard key={p.id} post={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
