import React, { useEffect, useState } from "react";
import { PanelLeft } from "lucide-react";
import Adminmenu from "../../../components/adminmenu/Adminmenu";
import Admincomp from "../../../components/admin/Admincomp";

function Adminpage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="admin-layout">
      {/*Fixed Modern Toggle Button (same position always) */}
      <button
        className={`menu-toggle d-lg-none ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle sidebar"
      >
        <PanelLeft size={26} />
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

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
