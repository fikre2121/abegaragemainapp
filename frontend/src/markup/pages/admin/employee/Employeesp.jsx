import React from "react";
import Employees from "../../../components/employee/Employees";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function Employeesp() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container-fluid py-4">
          <Employees />
        </div>
      </div>
    </div>
  );
}

export default Employeesp;
