import React from "react";
import ServiceMange from "../../../components/servicemaneg/Services";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function ServiceManegp() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container-fluid py-4">
          <ServiceMange />
        </div>
      </div>
    </div>
  );
}

export default ServiceManegp;
