import React, { useState } from "react";
import { loginRequest } from "../../../api/auth.service.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginRequest({
        employee_email: email,
        employee_password: password,
      });

      // because your axios interceptor returns response.data
      localStorage.setItem("token", response.token);

      toast.success("Login successful!");
      navigate("/admin/add-employee");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Login to your account</h2>
          </div>

          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleLogin} id="contact-form">
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          disabled={loading}
                        >
                          <span>{loading ? "Checking..." : "Login"}</span>
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
