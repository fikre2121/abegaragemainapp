import React from "react";
import Addcustomer from "../../../components/customer/Addcustomer";
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
          <Addcustomer />
        </div>
      </div>
    </div>
  );
}

export default Addcustomerp;
