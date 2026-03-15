import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Addemployform from "../../../components/addemployeeform/Addemployform";
import Adminmenu from "../../../components/adminmenu/Adminmenu";

function Addemployee() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Mobile Toggle Button */}
      <button
        className="menu-toggle d-lg-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <Adminmenu />
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div className="container-fluid py-4">
          <Addemployform />
        </div>
      </main>
    </div>
  );
}

export default Addemployee;
