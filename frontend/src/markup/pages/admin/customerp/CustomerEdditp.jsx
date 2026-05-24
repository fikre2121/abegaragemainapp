import React from "react";
import CustomerEddit from "../../../components/customer/CustomerEddit";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function CustomerEdditP() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container-fluid py-4">
          <CustomerEddit />
        </div>
      </div>
    </div>
  );
}

export default CustomerEdditP;
