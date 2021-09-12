import React from "react";
import Header from "../Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="px-1 py-3">
        <Header />
      </div>
      <div className="container-fluid">{children}</div>
    </>
  );
};

export default MainLayout;
