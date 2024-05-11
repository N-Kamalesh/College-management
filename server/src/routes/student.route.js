import express from "express";
import { studentController, studentCourses } from "../controllers/student.controller.js";

const studentRouter = express.Router();

studentRouter.get("/", studentController);
studentRouter.get("/dashboard", studentCourses);

export default studentRouter;
