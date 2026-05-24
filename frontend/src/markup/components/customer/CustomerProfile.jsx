import React from "react";

function CustomerProfile() {
  return (
    <div>
      <section className="history-section services-section">
        <div className="auto-container">
          <div className="history-block">
            <div className="years">info</div>
            <div className="content">
              <h4>Customer : Fikre Kindeya</h4>
              <div className="text">
                Nor again is there anyone who loves or pursues or desires to
                obtain pain of itself, because it is pain, but because
                occasionally circumstances occur in which toil and pain can
              </div>
            </div>
          </div>
          <div className="history-block">
            <div className="years">cars</div>
            <div className="content">
              <h4>Vehicles of Fikre</h4>
              <div className="text">
                {/* <!-- for  the vehicles --> */}
                <div className="bg-white w-100 p-4 mb-3 shadow-sm rounded">
                  <p className="mb-2">No vehicle found</p>
                </div>
                <button
                  className="theme-btn btn-style-one"
                  type="submit"
                  data-loading-text="Please wait..."
                >
                  <span>Add Vehicle</span>
                </button>
              </div>
            </div>
          </div>
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

export default CustomerProfile;
