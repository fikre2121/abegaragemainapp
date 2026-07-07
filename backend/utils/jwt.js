import jwt from "jsonwebtoken";

export const generateToken = (employee) => {
  return jwt.sign(
    {
      employee_id: employee.employee_id,
      email: employee.employee_email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
};
