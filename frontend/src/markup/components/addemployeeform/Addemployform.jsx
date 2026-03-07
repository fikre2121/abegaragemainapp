import React from "react";

function Addemployform() {
  return (
    <div>
      <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row">
            <div className="content-side col-xl-9 col-lg-8 order-lg-2">
              <section className="contact-section">
                <div className="auto-container">
                  <div className="contact-title">
                    <h2>Add a New Employee</h2>
                  </div>
                  <div className="row clearfix">
                    <div className="form-column col-lg-7">
                      <div className="inner-column">
                        <div className="contact-form">
                          <form
                            method="post"
                            action="sendemail.php"
                            id="contact-form"
                          >
                            <div className="row clearfix">
                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  name="email"
                                  value=""
                                  placeholder="Your Email"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  name="first_name"
                                  value=""
                                  placeholder="Employee-firest-Name"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  name="last-name"
                                  value=""
                                  placeholder="Employee-last-name"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  name="form_subject"
                                  value=""
                                  placeholder="phone-number"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <select name="profession" required>
                                  <option value="" disabled selected>
                                    Employee
                                  </option>
                                  <option value="manager">Manager</option>
                                  <option value="developer">Developer</option>
                                  <option value="designer">Designer</option>
                                  <option value="accountant">Accountant</option>
                                  <option value="hr">HR</option>
                                </select>
                              </div>
                              <div className="form-group col-md-12">
                                <input
                                  type="password"
                                  name="password"
                                  value=""
                                  placeholder="password"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <input
                                  id="form_botcheck"
                                  name="form_botcheck"
                                  className="form-control"
                                  type="hidden"
                                  value=""
                                />
                                <button
                                  className="theme-btn btn-style-one"
                                  type="submit"
                                  data-loading-text="Please wait..."
                                >
                                  <span>Add employee</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="mobile-menu">
                      <div className="menu-backdrop"></div>
                      <div className="close-btn">
                        <span className="icon flaticon-remove"></span>
                      </div>

                      <nav className="menu-box">
                        <div className="nav-logo">
                          <a href="index.html">
                            <img
                              src="assets/images/logo-two.png"
                              alt=""
                              title=""
                            />
                          </a>
                        </div>
                        <div className="menu-outer"></div>
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
                    <div className="info-column col-lg-5"></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addemployform;
