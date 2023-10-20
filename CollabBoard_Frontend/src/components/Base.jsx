import React from "react";
import { CustomNavbar } from "./CustomNavbar";

const Base = ({ children }) => {
  return (
    <div>
      <CustomNavbar />
      {children}
    </div>
  );
};

export default Base;
