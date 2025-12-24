import { uid } from "./utils";
import { seedIfEmpty } from "../data/seed";

const KEY = "campus_hub_db_v1";

export function getDB(){
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(KEY));
}

export function setDB(db){
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function resetDB(){
  localStorage.removeItem(KEY);
}

export function addPost(post){
  const db = getDB();
  const newPost = { id: uid("post"), createdAt: Date.now(), views: 0, ...post };
  db.posts.unshift(newPost);
  setDB(db);
  return newPost;
}

export function updatePost(id, patch){
  const db = getDB();
  db.posts = db.posts.map(p => p.id===id ? { ...p, ...patch } : p);
  setDB(db);
}

export function bumpView(id){
  const db = getDB();
  db.posts = db.posts.map(p => p.id===id ? { ...p, views: (p.views||0)+1 } : p);
  setDB(db);
}

export function addComment(postId, comment){
  const db = getDB();
  db.comments[postId] = db.comments[postId] || [];
  db.comments[postId].push({ id: uid("c"), createdAt: Date.now(), ...comment });
  setDB(db);
}

export function upsertUser(user){
  const db = getDB();
  const exists = db.users.find(u => u.email === user.email);
  if(exists){
    db.users = db.users.map(u => u.email===user.email ? { ...u, ...user } : u);
  }else{
    db.users.push({ id: uid("u"), createdAt: Date.now(), ...user });
  }
  setDB(db);
}
