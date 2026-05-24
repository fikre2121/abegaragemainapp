import React, { useEffect, useRef } from "react";
import Logo from "../../../assets/templateassets/images/custom/logo.png";
import { FaBars } from "react-icons/fa";

function Header() {
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuOuterRef = useRef(null);
  const stickyMenuRef = useRef(null);

  useEffect(() => {
    /* ---------------------------
       Sticky Header
    ---------------------------- */
    const handleScroll = () => {
      const siteHeader = headerRef.current;
      if (!siteHeader) return;

      if (window.scrollY > 100) {
        siteHeader.classList.add("fixed-header");
      } else {
        siteHeader.classList.remove("fixed-header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    /* ---------------------------
       Clone Menu (FIXED DUPLICATION)
    ---------------------------- */
    const mainMenu = document.querySelector(".main-menu .navigation");

    if (mainMenu && stickyMenuRef.current) {
      // ✅ FIX: clear previous clone before adding new one
      stickyMenuRef.current.innerHTML = "";

      const menuClone = mainMenu.cloneNode(true);
      stickyMenuRef.current.appendChild(menuClone);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------
     Mobile menu toggle
  ---------------------------- */

  const openMobileMenu = () => {
    document.body.classList.add("mobile-menu-visible");
  };

  const closeMobileMenu = () => {
    document.body.classList.remove("mobile-menu-visible");
  };

  return (
    <div>
      <header ref={headerRef} className="main-header header-style-one">
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
                  Schedule Your Appontment Today :<strong>1800 456 7890</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <div className="logo">
                  <a href="/">
                    <img src={Logo} alt="" />
                  </a>
                </div>
              </div>

              <div className="right-column">
                <div className="nav-outer">
                  <div className="mobile-nav-toggler" onClick={openMobileMenu}>
                    <FaBars size={24} color="#222" />
                  </div>

                  <nav className="main-menu navbar-expand-md navbar-light">
                    <div className="collapse navbar-collapse show clearfix">
                      <ul className="navigation">
                        <li className="dropdown">
                          <a href="/">Home</a>
                        </li>

                        <li className="dropdown">
                          <a href="/about">About Us</a>
                        </li>

                        <li className="dropdown">
                          <a href="/services">Services</a>
                        </li>

                        <li>
                          <a href="/contact">Contact Us</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div class="search-btn"></div>
                <div className="link-btn">
                  <a href="/login" className="theme-btn btn-style-one">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <div className="sticky-header">
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                <div className="logo-box">
                  <div className="logo">
                    <a href="/">
                      <img src={Logo} alt="" />
                    </a>
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

                    <nav
                      ref={stickyMenuRef}
                      className="main-menu navbar-expand-md navbar-light"
                    ></nav>
                  </div>
                  <div class="search-btn"></div>
                  <div className="link-btn">
                    <a href="/login" className="theme-btn btn-style-one">
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div ref={mobileMenuRef} className="mobile-menu">
          <div className="menu-backdrop" onClick={closeMobileMenu}></div>

          <div className="close-btn" onClick={closeMobileMenu}>
            <span className="icon flaticon-remove"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <a href="/">
                <img src={Logo} alt="" />
              </a>
            </div>

            <div className="menu-outer"></div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
