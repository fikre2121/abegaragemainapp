import express from "express";
import { login, } from "../controllers/auth.controller.js";
import { verifyToken, } from "../middlwares/auth.middleware.js";
import { allowRoles } from "../middlwares/role.middleware.js"
import {
  getCurrentEmployee
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/login", login);
// me endpont
router.get("/me", verifyToken, getCurrentEmployee);

export default router;
