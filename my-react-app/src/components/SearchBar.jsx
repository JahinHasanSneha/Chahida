import React from "react";

export default function SearchBar({ value, onChange, placeholder="Search posts, blood groups, course codes, halls, items..." }){
  return (
    <input
      className="input"
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
