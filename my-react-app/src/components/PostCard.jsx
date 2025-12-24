import React from "react";
import { Link } from "react-router-dom";
import TagPill from "./TagPill";
import { formatTime } from "../lib/utils";

export default function PostCard({ post }){
  return (
    <Link to={`/post/${post.id}`} className="card" style={{ padding: 14, display:"block" }}>
      <div className="hstack" style={{ justifyContent:"space-between" }}>
        <TagPill tag={post.tag} />
        <span className="badge" style={{ fontWeight: 700 }}>
          {post.status} • {post.urgency}
        </span>
      </div>

      <div style={{ marginTop: 10, fontWeight: 900, fontSize: 16, letterSpacing:"-0.01em" }}>
        {post.title}
      </div>

      <div className="muted small" style={{ marginTop: 6, lineHeight: 1.5 }}>
        {post.body}
      </div>

      <div className="hstack muted small" style={{ justifyContent:"space-between", marginTop: 10 }}>
        <span>
          {post.location?.hall}{post.location?.spot ? ` • ${post.location.spot}` : ""}
        </span>
        <span>
          {formatTime(post.createdAt)} • {post.views || 0} views
        </span>
      </div>
    </Link>
  );
}
