import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getDB } from "../lib/db";
import { searchAll } from "../lib/search";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import TagPill from "../components/TagPill";

export default function Category(){
  const { tag } = useParams();
  const decoded = decodeURIComponent(tag || "");
  const db = useMemo(() => getDB(), []);
  const [q, setQ] = useState("");

  const posts = useMemo(() => {
    let list = db.posts.filter(p => p.tag === decoded);
    if(q.trim()){
      list = searchAll({ query: q, posts: list, users: db.users }).posts;
    }
    return list;
  }, [db.posts, db.users, decoded, q]);

  return (
    <div className="vstack">
      <div className="card" style={{ padding: 16 }}>
        <div className="hstack" style={{ justifyContent:"space-between", flexWrap:"wrap" }}>
          <div>
            <div className="hstack">
              <TagPill tag={decoded} />
              <div style={{ fontWeight: 900, fontSize: 18, letterSpacing:"-0.02em" }}>{decoded}</div>
            </div>
            <div className="muted small" style={{ marginTop: 6 }}>
              Search within this category.
            </div>
          </div>
          <div style={{ width:"min(520px, 92vw)" }}>
            <SearchBar value={q} onChange={setQ} placeholder={`Search inside ${decoded}…`} />
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <EmptyState title="No posts found" hint="Try a different search keyword." />
      ) : (
        posts.slice(0, 40).map(p => <PostCard key={p.id} post={p} />)
      )}
    </div>
  );
}
