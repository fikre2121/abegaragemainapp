import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (employee) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing. Check your backend .env file.");
  }

  return jwt.sign(
    {
      employee_id: employee.employee_id,
      email: employee.employee_email,
      role: employee.company_role_name,
    },
    secret,
    {
      expiresIn: "24h",
    },
  );
};
