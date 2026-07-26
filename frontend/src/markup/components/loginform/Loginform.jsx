import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/ContextProvider";

function Loginform() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email address.");
    }

    if (!password.trim()) {
      return toast.error("Please enter your password.");
    }

    setLoading(true);

    try {
      await login({
        employee_email: email.trim(),
        employee_password: password,
      });
      navigate("/admin/add-employee");
    } catch (error) {
      console.error("Login error:", error);

      if (!error.response) {
        toast.error("Network error. Please check your internet connection.");
      } else if (error.response.status === 401) {
        toast.error("Invalid email or password.");
      } else if (error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(
          error.response?.data?.message || "Login failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="row clearfix auto-container">
          <div className="contact-title">
            <h2>Welcome Back</h2>
            <p>
              Sign in to access your dashboard and continue managing the
              application.
            </p>
          </div>
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleLogin}>
                  <div className="row clearfix">
                    {/* Email */}
                    <div className="form-group col-md-12">
                      <label>Email Address</label>

                      <input
                        type="email"
                        autoFocus
                        autoComplete="email"
                        disabled={loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="form-group col-md-12">
                      <label>Password</label>

                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          disabled={loading}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#666",
                            fontWeight: "500",
                          }}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div
                      className="form-group col-md-12"
                      style={{ textAlign: "right" }}
                    >
                      <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        disabled={loading}
                        style={{
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.8 : 1,
                        }}
                      >
                        {loading ? (
                          <>
                            <i
                              className="fa fa-spinner fa-spin"
                              style={{
                                marginRight: "8px",
                              }}
                            ></i>
                          </>
                        ) : (
                          "Login"
                        )}
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
  );
}

export default Loginform;
