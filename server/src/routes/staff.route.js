import express from "express";
import { staffController, getStaffData } from "../controllers/staff.controller.js";
import { verifyJWT } from "../utils/jwt.js";

const staffRouter = express.Router();

// staffRouter.get("/", staffController);
staffRouter.get("/:id", getStaffData);

export default staffRouter;
