import express from "express";

import { addEmployee,getEmployees } from "../controllers/employee.controller.js";

import { verifyToken } from "../middlwares/auth.middleware.js";

import { allowRoles } from "../middlwares/role.middleware.js";
const router = express.Router();
// add employee rout
router.post("/employees", addEmployee);
// 2. Fetch the paginated list of all employees
// Access: Restricted to 'admin' and 'manager' roles only
router.get("/employees",getEmployees);



export default router;
