import React from "react";

function Employees() {
  return (
    <div>
      <section className="services-section">
        <div className="auto-container container">
          <div className="sec-title style-two">
            <h2>Employees</h2>
          </div>

          {/* <!-- the table here --> */}
          <div className="table-responsive bg-white p-3 shadow-sm rounded">
            <table className="table table-hover align-middle">
              <thead className="">
                <tr>
                  <th>Active</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Role</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>yes</td>
                  <td>Fikre</td>
                  <td>Kindeya</td>
                  <td>fikre@email.com</td>
                  <td>0912345678</td>
                  <td>2026-03-17</td>

                  <td>Employee</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* <!-- Edit --> */}
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      {/* <!-- Delete --> */}
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>yes</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>
                  <td>Manager</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* <!-- Edit --> */}
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      {/* <!-- Delete --> */}
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>yes</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>
                  <td>Admin</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* <!-- Edit --> */}
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      {/* <!-- Delete --> */}
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>yes</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>

                  <td>Employee</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* <!-- Edit --> */}
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      {/* <!-- Delete --> */}
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>yes</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>

                  <td>Admin</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* <!-- Edit --> */}
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      {/* <!-- Delete --> */}
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>yes</td>
                  <td>Abel</td>
                  <td>Tesfaye</td>
                  <td>abel@email.com</td>
                  <td>0987654321</td>
                  <td>2026-03-15</td>

                  <td>Manager</td>
                  <td>
                    <div className="d-flex gap-2">
                      /{" "}
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      {/* <!-- Delete --> */}
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
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

export default Employees;
