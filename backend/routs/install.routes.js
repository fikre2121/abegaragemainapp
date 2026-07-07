import express from "express";
import { install } from "../controllers/install.controller.js";

const router = express.Router();

router.post("/install", install);

export default router;
