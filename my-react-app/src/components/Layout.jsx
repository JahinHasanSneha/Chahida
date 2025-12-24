import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }){
  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "18px 0 40px" }}>
        {children}
      </div>
      <div className="container muted small" style={{ paddingBottom: 28 }}>
        Built for campus life • Mock data • LocalStorage powered
      </div>
    </>
  );
}
