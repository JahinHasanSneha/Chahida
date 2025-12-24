export function uid(prefix="id"){
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function formatTime(ts){
  const d = new Date(ts);
  return d.toLocaleString(undefined, { month:"short", day:"2-digit", hour:"2-digit", minute:"2-digit" });
}

export function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

export function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

export function initials(name=""){
  const parts = name.trim().split(/\s+/).slice(0,2);
  return parts.map(p => p[0]?.toUpperCase()).join("") || "U";
}
