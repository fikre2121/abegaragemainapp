import React, { useState } from "react";
import { addEmployee } from "../../../api/auth.service.js";
import { toast } from "react-toastify";

const initialFormData = {
  employee_email: "",
  employee_first_name: "",
  employee_last_name: "",
  employee_phone: "",
  company_role_id: "3",
  employee_password: "",
};

function AddEmployeeForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      employee_email: formData.employee_email.trim(),
      employee_first_name: formData.employee_first_name.trim(),
      employee_last_name: formData.employee_last_name.trim(),
      employee_phone: formData.employee_phone.trim(),
      company_role_id: formData.company_role_id,
      employee_password: formData.employee_password,
    };

    try {
      await addEmployee(payload);

      // Reset form after successful submission
      setFormData(initialFormData);
      toast.success("Employee created successfuly");

      // No toast here because your Axios interceptor already handles success/errors.
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
          <div className="text">Register a new employee into the system.</div>
        </div>

        <div className="form-column col-lg-7">
          <div className="inner-column">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="row clearfix">
                  {/* Email */}
                  <div className="form-group col-md-12">
                    <input
                      type="email"
                      name="employee_email"
                      placeholder="Employee email"
                      value={formData.employee_email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* First Name */}
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      name="employee_first_name"
                      placeholder="Employee first name"
                      value={formData.employee_first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      name="employee_last_name"
                      placeholder="Employee last name"
                      value={formData.employee_last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group col-md-12">
                    <input
                      type="tel"
                      name="employee_phone"
                      placeholder="Employee phone (555-555-5555)"
                      value={formData.employee_phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Role */}
                  <div className="form-group col-md-12">
                    <select
                      name="company_role_id"
                      value={formData.company_role_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="3">Employee</option>
                      <option value="2">Manager</option>
                      <option value="1">Admin</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div className="form-group col-md-12">
                    <input
                      type="password"
                      name="employee_password"
                      placeholder="Employee password"
                      value={formData.employee_password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-group col-md-12">
                    <button
                      type="submit"
                      className="theme-btn btn-style-one"
                      disabled={loading}
                    >
                      <span>
                        {loading ? "Adding Employee..." : "ADD EMPLOYEE"}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;
