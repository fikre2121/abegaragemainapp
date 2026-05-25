import React from "react";
import EdditEmployee from "../../../components/employee/EdditEmployee";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function EmployEdditp() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container-fluid py-4">
          <EdditEmployee/>
        </div>
      </div>
    </div>
  );
}

export default EmployEdditp;
