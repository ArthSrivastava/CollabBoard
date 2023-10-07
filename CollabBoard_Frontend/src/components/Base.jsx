import React from "react";
import { CustomNavbar } from "./CustomNavbar";

const Base = ({ children, setRefresh }) => {
  return (
    <div>
      <CustomNavbar setRefresh={setRefresh} />
      {children}
    </div>
  );
};

export default Base;
