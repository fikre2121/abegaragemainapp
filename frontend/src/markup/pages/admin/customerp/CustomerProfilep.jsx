import React from "react";
import CustomerProfile from "../../../components/customer/CustomerProfile";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function CustomerProfileP() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container-fluid py-4">
          <CustomerProfile />
        </div>
      </div>
    </div>
  );
}

export default CustomerProfileP;
