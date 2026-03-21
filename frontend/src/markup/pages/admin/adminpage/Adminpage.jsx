import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Adminmenu from "../../../components/adminmenu/Adminmenu";
import Admincomp from "../../../components/admin/Admincomp";
function Adminpage() {
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
          <Admincomp />
        </div>
      </main>
    </div>
  );
}

export default Adminpage;
