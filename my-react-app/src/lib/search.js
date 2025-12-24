function norm(s=""){
  return String(s).toLowerCase().trim();
}

export function searchAll({ query, posts, users }){
  const q = norm(query);
  if(!q) return { posts, users };

  const postHit = (p) => {
    const blob = [
      p.title, p.body, p.tag, p.status, p.urgency,
      p.location?.hall, p.location?.room, p.location?.spot,
      p.meta?.bloodGroupNeeded, p.meta?.bloodGroup,
      p.meta?.courseCode, p.meta?.medicineName, p.meta?.itemName,
      p.meta?.price
    ].filter(Boolean).join(" ");
    return norm(blob).includes(q);
  };

  const userHit = (u) => {
    const blob = [
      u.name, u.studentId, u.hall, u.room, u.email, u.mobile,
      u.bloodGroup, u.levelTerm, u.donorOptIn ? "donor donate blood" : ""
    ].filter(Boolean).join(" ");
    return norm(blob).includes(q);
  };

  return {
    posts: posts.filter(postHit),
    users: users.filter(userHit),
  };
}

export function filterPosts(posts, { tag="All", hall="All", status="All", urgency="All" }){
  return posts.filter(p => {
    if(tag !== "All" && p.tag !== tag) return false;
    if(hall !== "All" && p.location?.hall !== hall) return false;
    if(status !== "All" && p.status !== status) return false;
    if(urgency !== "All" && p.urgency !== urgency) return false;
    return true;
  });
}
