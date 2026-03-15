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
       Sticky Header (headerStyle)
    ---------------------------- */

    const handleScroll = () => {
      const windowpos = window.scrollY;
      const siteHeader = headerRef.current;

      if (windowpos > 100) {
        siteHeader.classList.add("fixed-header");
      } else {
        siteHeader.classList.remove("fixed-header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    /* ---------------------------
       Clone Menu (script.js logic)
    ---------------------------- */

    const mainMenu = document.querySelector(".main-menu .navigation");

    if (mainMenu && menuOuterRef.current && stickyMenuRef.current) {
      const menuClone1 = mainMenu.cloneNode(true);
      const menuClone2 = mainMenu.cloneNode(true);

      menuOuterRef.current.appendChild(menuClone1);
      stickyMenuRef.current.appendChild(menuClone2);
    }

    /* ---------------------------
       Add dropdown button
    ---------------------------- */

    const dropdowns = document.querySelectorAll(
      ".main-header .navigation li.dropdown",
    );

    dropdowns.forEach((li) => {
      const btn = document.createElement("div");
      btn.className = "dropdown-btn";
      btn.innerHTML = '<span class="fa fa-angle-right"></span>';

      li.appendChild(btn);

      btn.addEventListener("click", () => {
        btn.classList.toggle("open");

        const submenu = btn.previousElementSibling;

        if (submenu) {
          submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
        }
      });
    });

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
                    <div
                      className="collapse navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
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

                <div className="search-btn"></div>

                <div className="link-btn">
                  <a href="/login" className="theme-btn btn-style-one">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                      <img src="/assets/images/icons/icon-bar.png" alt="" />
                    </div>

                    <nav
                      ref={stickyMenuRef}
                      className="main-menu navbar-expand-md navbar-light"
                    ></nav>
                  </div>

                  <div className="search-btn"></div>

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

            <div ref={menuOuterRef} className="menu-outer"></div>

            <div className="social-links">
              <ul className="clearfix">
                <li>
                  <a href="#">
                    <span className="fab fa-twitter"></span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span className="fab fa-facebook-square"></span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span className="fab fa-pinterest-p"></span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span className="fab fa-instagram"></span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span className="fab fa-youtube"></span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>
    </div>
  );
}

export default Header;
