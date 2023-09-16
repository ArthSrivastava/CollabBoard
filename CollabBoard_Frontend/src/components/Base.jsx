import React from "react";
import { CustomNavbar } from "./CustomNavbar";

const Base = ({ children }) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};

export default Base;
