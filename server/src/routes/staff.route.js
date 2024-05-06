import express from "express";
import { staffController } from "../controllers/staff.controller.js";

const staffRouter = express.Router();

staffRouter.get("/", staffController);

export default staffRouter;
