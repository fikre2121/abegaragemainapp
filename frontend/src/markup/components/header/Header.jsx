import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/ContextProvider"; 
import Logo from "../../../assets/templateassets/images/custom/logo.png";
import { FaBars, FaTimes } from "react-icons/fa"; 

function Header() {
  const { user, logout, isAuthenticated, hasRole } = useAuth(); 
  const navigate = useNavigate();
  const headerRef = useRef(null);

  // 1. Sticky Header Scroll Event Listener Lifecycle
  useEffect(() => {
    const handleScroll = () => {
      const siteHeader = headerRef.current;
      if (!siteHeader) return;

      if (window.scrollY > 100) {
        siteHeader.classList.add("fixed-header");
      } else {
        siteHeader.classList.remove("fixed-header");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Handle Safe Logouts
  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  // 3. Mobile Navigation Visibility Handlers
  const openMobileMenu = () =>
    document.body.classList.add("mobile-menu-visible");
  const closeMobileMenu = () =>
    document.body.classList.remove("mobile-menu-visible");

  
  // This central array renders links in main, sticky, AND mobile views automatically!
  const renderNavigationLinks = () => (
    <ul className="navigation">
      <li>
        <Link to="/" onClick={closeMobileMenu}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" onClick={closeMobileMenu}>
          About Us
        </Link>
      </li>
      <li>
        <Link to="/services" onClick={closeMobileMenu}>
          Services
        </Link>
      </li>
      <li>
        <Link to="/contact" onClick={closeMobileMenu}>
          Contact Us
        </Link>
      </li>

      {/* 🔐 Context Conditional Route: Render Dashboard link only if Admin or Manager logs in */}
      {isAuthenticated && hasRole("admin", "manager") && (
        <li>
          <Link
            to="/admin/employees"
            onClick={closeMobileMenu}
            className="text-primary font-weight-bold"
          >
            Dashboard
          </Link>
        </li>
      )}
    </ul>
  );

  // 5. Shared Dynamic Authentication Button Markup Box
  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted small d-none d-md-inline">
            Hello,{" "}
            <strong className="text-dark">
              {user.employee_first_name || "Staff"}
            </strong>
            <span
              className="badge bg-secondary ms-1 text-uppercase"
              style={{ fontSize: "10px" }}
            >
              {user.company_role_name}
            </span>
          </span>
          <button
            onClick={handleLogoutClick}
            className="theme-btn btn-style-one bg-danger border-0 text-white"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <Link to="/login" className="theme-btn btn-style-one">
        Login
      </Link>
    );
  };

  return (
    <div>
      <header ref={headerRef} className="main-header header-style-one">
        {/* Top Header Row */}
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Enjoy the Beso while we fix your car</div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              <div className="right-column">
                <div className="phone-number">
                  Schedule Your Appointment Today:{" "}
                  <strong>1800 456 7890</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upper Main Header Navigation bar */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src={Logo} alt="Company Logo" />
                  </Link>
                </div>
              </div>

              <div className="right-column">
                <div className="nav-outer">
                  <div className="mobile-nav-toggler" onClick={openMobileMenu}>
                    <FaBars size={24} color="#222" />
                  </div>
                  <nav className="main-menu navbar-expand-md navbar-light">
                    <div className="collapse navbar-collapse show clearfix">
                      {renderNavigationLinks()}
                    </div>
                  </nav>
                </div>

                <div className="search-btn"></div>
                <div className="link-btn">{renderAuthButtons()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 Professional Sticky Header (Pure React implementation replacing old Node cloning methods) */}
        <div className="sticky-header">
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                <div className="logo-box">
                  <div className="logo">
                    <Link to="/">
                      <img src={Logo} alt="Company Logo" />
                    </Link>
                  </div>
                </div>
                <div className="right-column">
                  <div className="nav-outer">
                    <div
                      className="mobile-nav-toggler"
                      onClick={openMobileMenu}
                    >
                      <FaBars size={24} color="#222" />
                    </div>
                    <nav className="main-menu navbar-expand-md navbar-light">
                      {renderNavigationLinks()}
                    </nav>
                  </div>
                  <div className="search-btn"></div>
                  <div className="link-btn">{renderAuthButtons()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Layer Menu */}
        <div className="mobile-menu">
          <div className="menu-backdrop" onClick={closeMobileMenu}></div>
          <div className="close-btn" onClick={closeMobileMenu}>
            <FaTimes size={20} className="mt-2 text-white" />
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/" onClick={closeMobileMenu}>
                <img src={Logo} alt="Company Logo" />
              </Link>
            </div>
            <div className="menu-outer">
              {renderNavigationLinks()}
              <div className="p-4 mt-3 border-t">{renderAuthButtons()}</div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
