import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addComment, bumpView, getDB, updatePost } from "../lib/db";
import TagPill from "../components/TagPill";
import { formatTime } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/EmptyState";

export default function PostDetails(){
  const { id } = useParams();
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [text, setText] = useState("");

  const db = useMemo(() => getDB(), [tick]);
  const post = db.posts.find(p => p.id === id);
  const comments = db.comments[id] || [];

  React.useEffect(() => {
    if(post){
      bumpView(id);
      setTick(x=>x+1);
    }
    // eslint-disable-next-line
  }, [id]);

  if(!post) return <EmptyState title="Post not found" hint="Go back to the feed and open another post." />;

  const setStatus = (status) => {
    updatePost(id, { status });
    setTick(x=>x+1);
  };

  const submit = () => {
    if(!text.trim()) return;
    addComment(id, {
      by: user?.name || "Guest",
      role: user?.levelTerm || "Visitor",
      body: text.trim()
    });
    setText("");
    setTick(x=>x+1);
  };

  return (
    <div className="grid">
      <div className="vstack">
        <div className="card" style={{ padding: 16 }}>
          <div className="hstack" style={{ justifyContent:"space-between" }}>
            <TagPill tag={post.tag} />
            <span className="badge" style={{ fontWeight: 900 }}>
              {post.status} • {post.urgency}
            </span>
          </div>

          <h2 style={{ margin:"12px 0 0", letterSpacing:"-0.02em" }}>{post.title}</h2>
          <div className="muted small" style={{ marginTop: 6, lineHeight: 1.6 }}>{post.body}</div>

          <div className="hr" />

          <div className="hstack muted small" style={{ justifyContent:"space-between", flexWrap:"wrap" }}>
            <span>By <b>{post.authorName}</b> • {formatTime(post.createdAt)}</span>
            <span>{post.location?.hall} • {post.location?.spot}{post.location?.room ? ` • Room ${post.location.room}`:""}</span>
          </div>

          {Object.keys(post.meta || {}).length > 0 && (
            <>
              <div className="hr" />
              <div className="vstack" style={{ gap: 10 }}>
                <div style={{ fontWeight: 900 }}>Details</div>
                <pre className="soft" style={{ margin:0, padding: 12, overflow:"auto", borderRadius: 16, fontSize: 13 }}>
{JSON.stringify(post.meta, null, 2)}
                </pre>
              </div>
            </>
          )}

          <div className="hr" />
          <div className="hstack" style={{ flexWrap:"wrap" }}>
            <button className="btn" style={{ fontWeight: 900 }} onClick={()=>setStatus("Open")}>Open</button>
            <button className="btn" style={{ fontWeight: 900 }} onClick={()=>setStatus("In progress")}>In progress</button>
            <button className="btn btnPrimary" style={{ fontWeight: 900 }} onClick={()=>setStatus("Resolved")}>Mark resolved</button>
            <Link to="/create" className="btn" style={{ fontWeight: 900 }}>Create another</Link>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div className="hstack" style={{ justifyContent:"space-between" }}>
            <div style={{ fontWeight: 900 }}>Responses</div>
            <span className="badge" style={{ fontWeight: 900 }}>{comments.length}</span>
          </div>

          <div className="hr" />

          <div className="vstack">
            {comments.length === 0 ? (
              <div className="muted small">No replies yet. Be the first to respond.</div>
            ) : (
              comments.slice().reverse().map(c => (
                <div key={c.id} className="soft" style={{ padding: 12 }}>
                  <div className="hstack" style={{ justifyContent:"space-between" }}>
                    <div style={{ fontWeight: 900 }}>{c.by}</div>
                    <span className="badge" style={{ fontWeight: 900 }}>{c.role}</span>
                  </div>
                  <div className="muted small" style={{ marginTop: 6, lineHeight: 1.6 }}>{c.body}</div>
                </div>
              ))
            )}
          </div>

          <div className="hr" />
          <textarea
            className="input"
            rows={3}
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Write a helpful response… (e.g., I can donate / I found it / I can sell / I have notes)"
          />
          <div className="hstack" style={{ justifyContent:"flex-end", marginTop: 10 }}>
            <button className="btn btnPrimary" style={{ fontWeight: 900 }} onClick={submit}>Send</button>
          </div>
        </div>
      </div>

      <div className="vstack">
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Next actions</div>
          <div className="muted small" style={{ marginTop: 6 }}>
            Quick tools to make this hackathon project feel “real”.
          </div>
          <div className="hr" />
          <div className="vstack">
            <Link to="/directory" className="btn" style={{ fontWeight: 900 }}>Find donors / students</Link>
            <Link to={`/category/${encodeURIComponent(post.tag)}`} className="btn" style={{ fontWeight: 900 }}>More like this</Link>
            <Link to="/settings" className="btn" style={{ fontWeight: 900 }}>Settings</Link>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Safety</div>
          <div className="muted small" style={{ marginTop: 6 }}>
            Campus-only. Avoid sharing room numbers publicly for sensitive posts.
          </div>
        </div>
      </div>
    </div>
  );
}
