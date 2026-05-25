import React from "react";
import Addemployform from "../../../components/employee/Addemployform";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function Addcustomerp() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container-fluid py-4">
          <Addemployform/>
        </div>
      </div>
    </div>
  );
}

export default Addcustomerp;
