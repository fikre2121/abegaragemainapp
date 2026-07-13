import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../../api/auth.service.js"; // Your professional API client file
import { SquarePen, Trash2 } from "lucide-react"; // Custom lucide design overrides

function AllEmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_records: 0,
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  // 1. Dynamic API Fetch Pipeline
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await getAllEmployees({ page, limit });
        setEmployees(response?.data || []);
        setPagination(
          response?.pagination || {
            current_page: 1,
            total_pages: 1,
            total_records: 0,
          },
        );
      } catch (error) {
        console.error(
          "Dashboard failed to retrieve employee data:",
          error.message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [page]);

  // Operational click handlers
  const handleEdit = (id) => {
    console.log("Edit employee ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete employee ID:", id);
  };

  // Safe Date string parsing utility matching your backend ISO data format
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Returns perfectly clean YYYY-MM-DD
    } catch {
      return dateString;
    }
  };

  return (
    <div>
      <section className="services-section">
        <div className="auto-container container">
          {/* Header Title Section */}
          <div className="sec-title style-two">
            <h2>Employees</h2>
          </div>

          {/* 1. Loading UI Wrapper State */}
          {loading ? (
            <div className="text-center py-5 bg-white shadow-sm rounded">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading Records...</span>
              </div>
              <p className="mt-2 text-muted small">
                Retrieving registry records...
              </p>
            </div>
          ) : employees.length === 0 ? (
            // 2. Clear Empty Database Safeguard Rows
            <div className="text-center py-5 bg-white shadow-sm rounded text-muted small">
              📋 No registered employees found in the directory.
            </div>
          ) : (
            // 3. Dynamic Interactive Table Grid Layout
            <>
              <div className="table-responsive bg-white p-3 shadow-sm rounded">
                <table className="table table-hover align-middle">
                  <thead>
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
                    {employees.map((emp) => (
                      <tr key={emp.employee_id}>
                        {/* Active State Column */}
                        <td className="text-capitalize">
                          {emp.active_employee === 1 ? "yes" : "no"}
                        </td>

                        {/* Name Matrix Rows */}
                        <td>{emp.employee_first_name || "—"}</td>
                        <td>{emp.employee_last_name || "—"}</td>

                        {/* Identity Payload Information */}
                        <td>{emp.employee_email}</td>
                        <td>{emp.employee_phone || "—"}</td>
                        <td>{formatDate(emp.added_date)}</td>
                        <td>{emp.company_role_name || "Employee"}</td>

                        {/* Action Control Ports */}
                        <td>
                          <div className="d-flex gap-2">
                            {/* Edit Button */}
                            <button
                              onClick={() => handleEdit(emp.employee_id)}
                              className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
                              style={{ width: "32px", height: "32px" }}
                              title="Edit Record"
                            >
                              <SquarePen size={14} />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(emp.employee_id)}
                              className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                              style={{ width: "32px", height: "32px" }}
                              title="Delete Record"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 🕹️ Production Pagination Framework Hooked Directly to API States */}
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination">
                    {/* Previous Button Page Control Trigger */}
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {/* Generate Numbered Pages Automatically */}
                    {Array.from(
                      { length: pagination.total_pages },
                      (_, idx) => {
                        const pageNumber = idx + 1;
                        return (
                          <li
                            key={pageNumber}
                            className={`page-item ${page === pageNumber ? "active" : ""}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setPage(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          </li>
                        );
                      },
                    )}

                    {/* Next Button Page Control Trigger */}
                    <li
                      className={`page-item ${page === pagination.total_pages ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(prev + 1, pagination.total_pages),
                          )
                        }
                        disabled={page === pagination.total_pages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default AllEmployeesPage;
