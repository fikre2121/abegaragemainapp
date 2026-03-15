import React from "react";

function Addcustomer() {
  return (
    <div>
      <section className="contact-section">
        <div className="auto-container">
          <div className="">
            <div className="contact-title">
              <h2>Add a new Customer</h2>
              <div className="text">
                Praising pain was born and I will give you a complete account of
                the system, and
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
                          placeholder="Customer-firest-Name"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="last-name"
                          value=""
                          placeholder="Customer-last-name"
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
                          <span>ADD Customer</span>
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

export default Addcustomer;
