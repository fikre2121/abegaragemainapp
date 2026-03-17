import React, { useState } from "react";
import { X } from "lucide-react";

function AddVehicle() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      <section className="history-section">
        <div className="auto-container">
          {/* Customer Info */}
          <div className="history-block">
            <div className="years">info</div>
            <div className="content">
              <h4>Customer : Fikre Kindeya</h4>
              <div className="text">
                Nor again is there anyone who loves or pursues or desires to
                obtain pain of itself.
              </div>
            </div>
          </div>

          {/* Vehicles Section */}
          <div className="history-block">
            <div className="years">cars</div>
            <div className="content">
              <h4>Vehicles of Fikre</h4>

              {showForm && (
                <section className="contact-section position-relative">
                  {/* Close Button */}
                  <button
                    className="close-form-btn"
                    onClick={() => setShowForm(false)}
                  >
                    <X size={22} />
                  </button>

                  <div className="auto-container">
                    <div className="contact-title">
                      <h2>Add a new vehicle</h2>
                      <div className="text">
                        Fill the form to add a vehicle for this customer.
                      </div>
                    </div>

                    <div className="form-column col-lg-7">
                      <div className="inner-column">
                        <div className="contact-form">
                          <form>
                            <div className="row clearfix">
                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  placeholder="Vehicle Model"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  placeholder="Vehicle Brand"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  placeholder="Plate Number"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <input
                                  type="text"
                                  placeholder="Mileage"
                                  required
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <button
                                  className="theme-btn btn-style-one"
                                  type="submit"
                                >
                                  <span>Add Vehicle</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Orders */}
          <div className="history-block">
            <div className="years">Orders</div>
            <div className="content">
              <h4>Orders of Fikre</h4>
              <div className="text">
                <p>orders will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddVehicle;
