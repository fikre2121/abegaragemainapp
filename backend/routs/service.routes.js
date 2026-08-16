import express from "express";

import { verifyToken } from "../middlwares/auth.middleware.js";

import { getServices,addService,editService ,deleteService} from "../controllers/service.controller.js";

const router = express.Router();

// GET all active services
router.get("/services", verifyToken, getServices);
router.post("/service", verifyToken, addService);
router.put("/service", verifyToken, editService);
router.delete("/service/:id", verifyToken, deleteService);

export default router;
