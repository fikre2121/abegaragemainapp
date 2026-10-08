import React, { useCallback, useEffect, useState } from "react";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import { Bell, LayoutDashboard, PanelLeft, X } from "lucide-react";

import Adminmenu from "../../components/adminmenu/Adminmenu";

/* Styles live inside this file so no separate CSS file is needed */
const styles = `
.ap-root {
  --ap-bg: #f5f6fa;
  --ap-surface: #ffffff;
  --ap-border: #e6e8ee;
  --ap-text: #141a2a;
  --ap-muted: #6b7385;
  --ap-accent: #3b5bdb;
  --ap-accent-soft: #edf1ff;
  --ap-sidebar-w: 272px;
  --ap-header-h: 72px;

  min-height: 100vh;
  background: var(--ap-bg);
  color: var(--ap-text);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ---------- Sidebar ---------- */
.ap-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  width: min(var(--ap-sidebar-w), 86vw);
  background: var(--ap-surface);
  border-right: 1px solid var(--ap-border);
  transform: translateX(-100%);
  transition: transform 0.28s cubic-bezier(0.22, 0.8, 0.3, 1),
    box-shadow 0.28s ease;
}
.ap-sidebar.is-open {
  transform: translateX(0);
  box-shadow: 0 24px 60px rgba(20, 26, 42, 0.25);
}

.ap-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--ap-header-h);
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--ap-border);
  flex-shrink: 0;
}
.ap-brand-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
.ap-logo {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--ap-accent);
  color: #fff;
  flex-shrink: 0;
}
.ap-brand-title {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.2;
}
.ap-brand-sub {
  display: block;
  font-size: 0.75rem;
  color: var(--ap-muted);
}

.ap-sidebar-body {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1rem 0.75rem 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--ap-border) transparent;
}

/* ---------- Backdrop ---------- */
.ap-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1040;
  background: rgba(20, 26, 42, 0.45);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.ap-backdrop.is-visible {
  opacity: 1;
  pointer-events: auto;
}

/* ---------- Main column ---------- */
.ap-main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ---------- Header ---------- */
.ap-header {
  position: sticky;
  top: 0;
  z-index: 1030;
  height: var(--ap-header-h);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--ap-border);
}
.ap-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
  padding: 0 1rem;
}
.ap-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
.ap-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.25;
}
.ap-subtitle {
  margin: 0;
  font-size: 0.82rem;
  color: var(--ap-muted);
}
.ap-header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ap-icon-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--ap-border);
  border-radius: 12px;
  background: var(--ap-surface);
  color: var(--ap-text);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.ap-icon-btn:hover {
  background: var(--ap-bg);
  border-color: #d5d9e3;
}
.ap-icon-btn.is-ghost {
  border-color: transparent;
  background: transparent;
}
.ap-icon-btn.is-ghost:hover {
  background: var(--ap-bg);
}

.ap-dot {
  position: absolute;
  top: 9px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e5484d;
  border: 2px solid var(--ap-surface);
}

.ap-avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-left: 0.25rem;
  border-radius: 50%;
  background: var(--ap-accent-soft);
  color: var(--ap-accent);
  font-weight: 700;
  font-size: 0.95rem;
  user-select: none;
}

/* ---------- Content ---------- */
.ap-content {
  flex: 1 1 auto;
  padding: 1.25rem 1rem 2.5rem;
}
.ap-content-inner {
  max-width: 1600px;
  margin: 0 auto;
}

/* ---------- Focus ---------- */
.ap-root button:focus-visible,
.ap-root a:focus-visible {
  outline: 2px solid var(--ap-accent);
  outline-offset: 2px;
}

/* ---------- Tablet and up ---------- */
@media (min-width: 768px) {
  .ap-header-inner { padding: 0 1.5rem; }
  .ap-content { padding: 1.75rem 1.5rem 3rem; }
}

/* ---------- Desktop ---------- */
@media (min-width: 992px) {
  .ap-sidebar {
    width: var(--ap-sidebar-w);
    transform: none;
    box-shadow: none;
  }
  .ap-backdrop { display: none; }
  .ap-main { padding-left: var(--ap-sidebar-w); }
  .ap-mobile-only { display: none !important; }
}
@media (max-width: 991.98px) {
  .ap-desktop-only { display: none !important; }
}

/* ---------- Motion preferences ---------- */
@media (prefers-reduced-motion: reduce) {
  .ap-sidebar,
  .ap-backdrop,
  .ap-icon-btn { transition: none; }
}
`;

/**
 * Page titles shown in the header, matched against the current URL.
 * Add one line here whenever you add a new admin route.
 */
const PAGE_META = [
  {
    path: "/admin",
    title: "Dashboard",
    subtitle: "Here's what's happening today.",
  },
  {
    path: "/admin/customers",
    title: "Customers",
    subtitle: "View and manage your customers.",
  },
  {
    path: "/admin/add-customer",
    title: "Add customer",
    subtitle: "Create a new customer record.",
  },
  {
    path: "/admin/edit-customer/:id",
    title: "Edit customer",
    subtitle: "Update this customer's details.",
  },
  {
    path: "/admin/employees",
    title: "Employees",
    subtitle: "View and manage your team.",
  },
  {
    path: "/admin/add-employee",
    title: "Add employee",
    subtitle: "Create a new employee record.",
  },
  {
    path: "/admin/edit-employee/:id",
    title: "Edit employee",
    subtitle: "Update this employee's details.",
  },
  {
    path: "/admin/service-manage",
    title: "Services",
    subtitle: "Manage the services you offer.",
  },
  {
    path: "/admin/add-vehicle",
    title: "Add vehicle",
    subtitle: "Register a new vehicle.",
  },
];

function usePageMeta(pathname) {
  const match = PAGE_META.find((page) =>
    matchPath({ path: page.path, end: true }, pathname),
  );
  return match || { title: "Admin Panel", subtitle: "" };
}

/**
 * Shared shell for every admin page: sidebar, header and content area.
 * The routed page renders inside <Outlet />.
 */
function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { title, subtitle } = usePageMeta(pathname);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // On every page change: close the mobile drawer and scroll back to the top
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Keep the browser tab title in sync with the page
  useEffect(() => {
    document.title = `${title} · Admin Panel`;
  }, [title]);

  // Lock background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the drawer; growing to desktop size resets it
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth >= 992) closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [closeMenu]);

  return (
    <div className="ap-root">
      <style>{styles}</style>

      {/* Mobile backdrop */}
      <div
        className={`ap-backdrop ${menuOpen ? "is-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Sidebar (rendered once, stays mounted while you navigate) */}
      <aside
        id="admin-sidebar"
        className={`ap-sidebar ${menuOpen ? "is-open" : ""}`}
        aria-label="Admin navigation"
      >
        <div className="ap-brand">
          <div className="ap-brand-main">
            <div className="ap-logo">
              <LayoutDashboard size={20} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h6 className="ap-brand-title">Admin Panel</h6>
              <small className="ap-brand-sub">Management dashboard</small>
            </div>
          </div>

          <button
            type="button"
            className="ap-icon-btn is-ghost ap-mobile-only"
            onClick={closeMenu}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="ap-sidebar-body">
          <Adminmenu />
        </div>
      </aside>

      {/* Main */}
      <div className="ap-main">
        <header className="ap-header">
          <div className="ap-header-inner">
            <div className="ap-header-left">
              <button
                type="button"
                className="ap-icon-btn ap-mobile-only"
                onClick={() => setMenuOpen(true)}
                aria-label="Open sidebar"
                aria-expanded={menuOpen}
                aria-controls="admin-sidebar"
              >
                <PanelLeft size={20} />
              </button>

              <div>
                <h1 className="ap-title">{title}</h1>
                {subtitle && (
                  <p className="ap-subtitle ap-desktop-only">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="ap-header-right">
              <button
                type="button"
                className="ap-icon-btn"
                aria-label="Notifications"
              >
                <Bell size={19} />
                <span className="ap-dot" aria-hidden="true" />
              </button>
              <div className="ap-avatar" aria-label="Signed in as admin">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="ap-content">
          <div className="ap-content-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
