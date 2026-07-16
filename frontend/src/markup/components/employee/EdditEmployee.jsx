import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleEmployee,
  updateEmployee,
} from "../../../api/auth.service"; // Adjust path to your axios services file
import { Loader2 } from "lucide-react";

function EditEmployee() {
  const { id } = useParams(); // Dynamically extracts the employee ID from the router URL parameter
  const navigate = useNavigate();

  // 1. Unified state schema matching your real API/Database attributes
  const [formData, setFormData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    company_role_id: 3, // Defaults to 3 (Employee)
    active_employee: 1, // 1 for active, 0 for inactive
    employee_email: "", // Saved purely to display in the header text metadata
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 2. Fetch active employee details from DB on initial page layout mount
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        const response = await getSingleEmployee(id);

        // Unpack database query object wrapper safely
        const emp = response?.data?.[0] || response?.data;

        if (emp) {
          setFormData({
            employee_first_name: emp.employee_first_name || "",
            employee_last_name: emp.employee_last_name || "",
            employee_phone: emp.employee_phone || "",
            company_role_id: emp.company_role_id || 3,
            active_employee: emp.active_employee ?? 1,
            employee_email: emp.employee_email || "",
          });
        }
      } catch (error) {
        console.error("Profile hydration cycle rejected:", error.message);
        navigate("/employees"); // Fail-safe fallback escape routing targeting the directory list
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEmployeeDetails();
  }, [id, navigate]);

  // 3. Central change tracker managing string parameters and dropdown fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "company_role_id" ? parseInt(value, 10) : value,
    }));
  };

  // 4. Custom binary toggle handler linking HTML checkboxes to SQL bits (1 or 0)
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      active_employee: checked ? 1 : 0,
    }));
  };

  // 5. Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Execute transactional UPDATE against the backend controllers
      await updateEmployee(id, formData);
      navigate("/employees"); // Return cleanly back to your database list panel on success
    } catch (error) {
      console.error(
        "Transactional patch signature execution failed:",
        error.message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Global Page Fetch Spinner Guard
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <Loader2 className="animate-spin text-primary mb-2" size={32} />
        <p className="text-muted small font-weight-bold">
          Hydrating Profile Context...
        </p>
      </div>
    );
  }

  return (
    <div>
      <section className="contact-section services-section">
        <div className="auto-container container">
          <div>
            {/* Dynamic Headers Mapping Real Data Variables */}
            <div className="contact-title mb-4">
              <h2>
                Edit: {formData.employee_first_name}{" "}
                {formData.employee_last_name}
              </h2>
              <div className="text text-muted">
                <h5 className="font-weight-normal">
                  Employee email: {formData.employee_email}
                </h5>
              </div>
            </div>

            {/* Core Interaction Columns */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleSubmit} id="contact-form">
                    <div className="row clearfix">
                      {/* First Name Input */}
                      <div className="form-group col-md-12 mb-3">
                        <label className="form-label small font-weight-bold text-muted text-uppercase">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="employee_first_name"
                          value={formData.employee_first_name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="First Name"
                          required
                        />
                      </div>

                      {/* Last Name Input */}
                      <div className="form-group col-md-12 mb-3">
                        <label className="form-label small font-weight-bold text-muted text-uppercase">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="employee_last_name"
                          value={formData.employee_last_name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Last Name"
                          required
                        />
                      </div>

                      {/* Phone Number Input */}
                      <div className="form-group col-md-12 mb-3">
                        <label className="form-label small font-weight-bold text-muted text-uppercase">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="employee_phone"
                          value={formData.employee_phone}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Phone Number (e.g. 555-555-5555)"
                          required
                        />
                      </div>

                      {/* Relational Role Dropdown */}
                      <div className="form-group col-md-12 mb-3">
                        <label className="form-label small font-weight-bold text-muted text-uppercase">
                          Company Role
                        </label>
                        <select
                          name="company_role_id"
                          value={formData.company_role_id}
                          onChange={handleChange}
                          className="form-select form-control"
                          required
                        >
                          <option value={1}>Admin</option>
                          <option value={2}>Manager</option>
                          <option value={3}>Employee</option>
                        </select>
                      </div>

                      {/* Active Status Checkbox Node */}
                      <div className="form-group col-md-12">
                        <div className="form-check d-flex align-items-center gap-2 mt-2 mb-4">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isActive"
                            name="active_employee"
                            checked={formData.active_employee === 1}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label font-weight-medium"
                            htmlFor="isActive"
                          >
                            Is Active Employee
                          </label>
                        </div>

                        {/* Submit Button Action Triggers */}
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          disabled={submitting}
                        >
                          <span>{submitting ? "Updating..." : "Update"}</span>
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

export default EditEmployee;
