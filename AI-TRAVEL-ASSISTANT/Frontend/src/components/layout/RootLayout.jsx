import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../custom/Header"; // Adjust path if necessary

function RootLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> 
      </main>
    </div>
  );
}

export default RootLayout;
