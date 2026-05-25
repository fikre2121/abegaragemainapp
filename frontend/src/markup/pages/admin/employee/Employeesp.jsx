import React from "react";
import Employees from "../../../components/employee/Employees";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function Employeesp() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 240,
          flexShrink: 0,
          background: "#fff",
          borderRight: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Employees />
      </div>
    </div>
  );
}

export default Employeesp;
