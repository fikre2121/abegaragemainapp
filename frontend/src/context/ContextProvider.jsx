import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import { loginRequest, getCurrentEmployee } from "../api/auth.service";

import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
   |--------------------------------------------------------------------------
   | Restore Existing Session
   |--------------------------------------------------------------------------
   |
   | When user refreshes the page:
   | 1. Check JWT token
   | 2. Ask backend who is logged in
   | 3. Store employee in context
   |
   */
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentEmployee();

        const employee = response?.data?.data || response?.data || null;

        if (!employee) {
          throw new Error("Invalid employee session");
        }

        setUser(employee);

        // cache user for instant loading
        localStorage.setItem("user", JSON.stringify(employee));
      } catch (error) {
        console.error("Session restore failed:", error.message);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /*
   |--------------------------------------------------------------------------
   | Login
   |--------------------------------------------------------------------------
   */
  const login = useCallback(async (credentials) => {
    try {
      const response = await loginRequest(credentials);

      const token = response?.data?.token;

      if (!token) {
        throw new Error("Authentication token missing");
      }

      localStorage.setItem("token", token);

      /*
       After login we call /me
       because backend is the source of truth
      */

      const meResponse = await getCurrentEmployee();

      const employee = meResponse?.data?.data || meResponse?.data;

      if (!employee) {
        throw new Error("Unable to load employee profile");
      }

      setUser(employee);

      localStorage.setItem("user", JSON.stringify(employee));

      toast.success("Login successful!");

      return employee;
    } catch (error) {
      console.error("Login failed:", error.message);

      throw error;
    }
  }, []);

  /*
   |--------------------------------------------------------------------------
   | Logout
   |--------------------------------------------------------------------------
   */
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    toast.info("Logged out successfully");
  }, []);

  /*
   |--------------------------------------------------------------------------
   | Role Permission System
   |--------------------------------------------------------------------------
   */
  const hasRole = useCallback(
    (...roles) => {
      if (!user?.company_role_name) return false;

      const currentRole = user.company_role_name.toLowerCase();

      return roles.map((role) => role.toLowerCase()).includes(currentRole);
    },
    [user],
  );

  const contextValue = useMemo(
    () => ({
      user,

      loading,

      login,

      logout,

      hasRole,

      isAuthenticated: Boolean(user),
    }),
    [user, loading, login, logout, hasRole],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
};
