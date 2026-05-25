import React from "react";

function EdditEmployee() {
  return (
    <div>
      <section className="contact-section services-section">
        <div className="auto-container container">
          <div className="">
            <div className="contact-title">
              <h2>Eddit : Fikre kindeya</h2>
              <div className="text">
                <h4>Employee email : abebe@example.come</h4>
              </div>
            </div>
            {/* <!--Form Column--> */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                {/* <!--Contact Form--> */}
                <div className="contact-form">
                  <form method="post" action="sendemail.php" id="contact-form">
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="first_name"
                          value=""
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input type="text" name="last-name" value="" required />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="form_subject"
                          value=""
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
                          id="form_botcheck"
                          name="form_botcheck"
                          className="form-control"
                          type="hidden"
                          value=""
                        />
                        <div className="form-check d-flex align-items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isActive"
                            name="is_active"
                          />
                          <label className="form-check-label" for="isActive">
                            Is Active Customer
                          </label>
                        </div>
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Update</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!--End Contact Form--> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EdditEmployee;
