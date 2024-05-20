import express from "express";
import {
  getCourses,
  getStudents,
  newView,
  getAllStudents,
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

staffRouter.get("/courses/course", verifyJWT, getCourses);
staffRouter.get("/courses/create", verifyJWT, newView);
staffRouter.get("/courses/", verifyJWT, getStudents);
staffRouter.get("/courses/all", verifyJWT, getAllStudents);
staffRouter.get("/courses/student", verifyJWT, getMarksAttendance);
staffRouter.patch("/courses/student", verifyJWT, updateMarks);
staffRouter.get("/courses/student/name", verifyJWT, getStudentInfo);
staffRouter.get("/announcement/:id", verifyJWT, getAnnouncements);
staffRouter.post("/announcement/add", verifyJWT, addAnnouncement);
staffRouter.delete("/announcement/:id", verifyJWT, deleteAnnouncement);
staffRouter.put("/announcement/:id", verifyJWT, updateAnnouncement);

export default staffRouter;
