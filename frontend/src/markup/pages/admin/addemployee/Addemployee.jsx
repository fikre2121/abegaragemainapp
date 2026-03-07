import React from "react";
import Addemployform from "../../../components/addemployeeform/Addemployform";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function Addemployee() {
  return (
    <div className="container-fluid py-4 admin-pages">
      <div className="row">
        {/* Sidebar / Menu */}
        <div className="col-12 col-md-4 col-lg-3 mb-4">
          <Adminmenu />
        </div>

        {/* Form */}
        <div className="col-12 col-md-8 col-lg-9">
          <Addemployform />
        </div>
      </div>
    </div>
  );
}

export default Addemployee;
