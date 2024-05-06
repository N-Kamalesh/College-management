import express from "express";
import { studentController } from "../controllers/student.controller.js";

const studentRouter = express.Router();

studentRouter.get("/", studentController);

export default studentRouter;
