import React from "react";

function Customers() {
  return (
    <div>
      <section className="services-section ">
        <div className="auto-container container">
          <div className="sec-title style-two">
            <h2>Customers</h2>
          </div>
          {/* <!-- the searchbare here --> */}
          <div className=" row mb-4">
            <div className="col-lg-12 col-md col-sm-12 mx-auto">
              <div className="input-group shadow-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search customers...using firstnam ,lastname email and phone number"
                />
              </div>
            </div>
          </div>
          {/* <!-- the table here --> */}
          <div className="table-responsive bg-white p-3 shadow-sm rounded">
            <table className="table table-hover align-middle">
              <thead className="">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Fikre</td>
                  <td>Kindeya</td>
                  <td>fikre@email.com</td>
                  <td>0912345678</td>
                  <td>2026-03-17</td>
                  <td>
                    <span className="badge bg-success">Active</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>
                  <td>
                    <span className="badge bg-danger">Inactive</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>
                  <td>
                    <span className="badge bg-danger">Inactive</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>
                  <td>
                    <span className="badge bg-danger">Inactive</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>
                  <td>
                    <span className="badge bg-danger">Inactive</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>
                  <td>
                    <span className="badge bg-danger">Inactive</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <!-- Pagination --> */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link">Previous</a>
                </li>

                <li className="page-item active">
                  <a className="page-link">1</a>
                </li>

                <li className="page-item">
                  <a className="page-link">2</a>
                </li>

                <li className="page-item">
                  <a className="page-link">Next</a>
                </li>

                <li className="page-item">
                  <a className="page-link">Last</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Customers;
