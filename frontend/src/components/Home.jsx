import React from "react";
import Navbar from "./Navbar"; 

const Home = () => {
  return (
    <div>
      <Navbar /> 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Welcome to WoodWorking Hub
        </h1>
      </div>
    </div>
  );
};

export default Home;
