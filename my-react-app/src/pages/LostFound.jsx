import React from "react";
import Category from "./Category";

export default function LostFound(){
  // This page exists so Navbar link feels polished.
  // It relies on Category route; but we keep a dedicated page.
  return <CategoryWrapper tag="Lost & Found" />;
}

function CategoryWrapper({ tag }){
  // redirect-like UI (simple)
  return (
    <>
    <div>
      <p>
       Lost or Found something? CHAHIDA has your back...
       </p>
       <div>
        <div className="lost&found">
          found posts:
        </div>
        <div>
          Lost posts:
        </div>
       </div>
    </div>
    </>
  );
}
