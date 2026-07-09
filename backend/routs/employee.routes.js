import express from "express";

import { addEmployee } from "../controllers/employee.controller.js";

import { verifyToken } from "../middlwares/auth.middleware.js";

import { allowRoles } from "../middlwares/role.middleware.js";

const router = express.Router();

router.post("/employees", addEmployee);

export default router;
