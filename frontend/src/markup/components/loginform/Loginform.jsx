import React from "react";

function Loginform() {
  return (
    <div>
      <section class="contact-section">
        <div class="auto-container">
          <div class="contact-title">
            <h2>Login to your acount</h2>
          </div>
          <div class="row clearfix">
            <div class="form-column col-lg-7">
              <div class="inner-column">
                <div class="contact-form">
                  <form method="post" action="sendemail.php" id="contact-form">
                    <div class="row clearfix">
                      <div class="form-group col-md-12">
                        <input
                          type="text"
                          name="email"
                          value=""
                          placeholder="Your Email"
                          required
                        />
                      </div>
                      <div class="form-group col-md-12">
                        <input
                          type="password"
                          name="password"
                          value=""
                          placeholder="password"
                          required
                        />
                      </div>

                      <div class="form-group col-md-12">
                        <input
                          id="form_botcheck"
                          name="form_botcheck"
                          class="form-control"
                          type="hidden"
                          value=""
                        />
                        <button
                          class="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Login</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Loginform;
