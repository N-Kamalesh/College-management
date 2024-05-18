import express from "express";
import {
  getCourses,
  getStudents,
  newView,
  getALLStudents,
  getMarksAttendance,
  updateMarks,
  getStudentInfo,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "../controllers/staff.controller.js";
import { verifyJWT } from "../utils/jwt.js";
import { getAnnouncements } from "../controllers/student.controller.js";

const staffRouter = express.Router();

staffRouter.get("/courses/course", getCourses);
staffRouter.get("/courses/create", newView);
staffRouter.get("/courses/", getStudents);
staffRouter.get("/courses/all", getALLStudents);
staffRouter.get("/courses/student", getMarksAttendance);
staffRouter.patch("/courses/student", updateMarks);
staffRouter.get("/courses/student/name", getStudentInfo);
// staffRouter.get("/:id", getStaffData);
staffRouter.get("/announcement/:id", verifyJWT, getAnnouncements);
staffRouter.post("/announcement/add", verifyJWT, addAnnouncement);
staffRouter.delete("/announcement/:id", verifyJWT, deleteAnnouncement);
staffRouter.put("/announcement/:id", verifyJWT, updateAnnouncement);

export default staffRouter;
