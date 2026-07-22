import jwt from "jsonwebtoken";

export const generateToken = (employee) => {
  return jwt.sign(
    {
      employee_id: employee.employee_id,
      email: employee.employee_email,
      role: employee.company_role_name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );
};
