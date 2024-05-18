import express from "express";
import { staffController, getCourses, getStudents, newView, getALLStudents, getMarksAttendance, updateMarks } from "../controllers/staff.controller.js";
import { verifyJWT } from "../utils/jwt.js";

const staffRouter = express.Router();

staffRouter.get("/", staffController);
staffRouter.get("/courses/course", getCourses);
staffRouter.get("/courses/create", newView);
staffRouter.get("/courses/", getStudents);
staffRouter.get("/courses/all", getALLStudents);
staffRouter.get("/courses/student", getMarksAttendance);
staffRouter.patch("/courses/student", updateMarks);
// staffRouter.get("/:id", getStaffData);

export default staffRouter;
