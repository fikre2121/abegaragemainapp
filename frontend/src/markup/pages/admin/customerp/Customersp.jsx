import React from "react";
import Customers from "../../../components/customer/Customers";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function Customersp() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container-fluid py-4">
          <Customers />
        </div>
      </div>
    </div>
  );
}

export default Customersp;
