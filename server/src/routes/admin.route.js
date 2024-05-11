import express from "express";
import {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  getDepartments,
  addDepartment,
  updateDepartment,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
  getTeaches,
  addTeaches,
  updateTeaches,
  deleteTeaches,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../utils/jwt.js";

const adminRouter = express.Router();

adminRouter.get("/student", verifyJWT, getStudents);
adminRouter.post("/student/add", verifyJWT, addStudent);
adminRouter.put("/student/:id", verifyJWT, updateStudent);
adminRouter.delete("/student/:id", verifyJWT, deleteStudent);

adminRouter.get("/staff", verifyJWT, getStaffs);
adminRouter.post("/staff/add", verifyJWT, addStaff);
adminRouter.put("/staff/:id", verifyJWT, updateStaff);
adminRouter.delete("/staff/:id", verifyJWT, deleteStaff);

adminRouter.get("/announcement", verifyJWT, getAnnouncements);
adminRouter.post("/announcement/add", verifyJWT, addAnnouncement);
adminRouter.delete("/announcement/:id", verifyJWT, deleteAnnouncement);
adminRouter.put("/announcement/:id", verifyJWT, updateAnnouncement);

adminRouter.get("/teaches", verifyJWT, getTeaches);
adminRouter.post("/teaches/add", verifyJWT, addTeaches);
adminRouter.put("/teaches/:id", verifyJWT, updateTeaches);
adminRouter.delete("/teaches/:id", verifyJWT, deleteTeaches);

adminRouter.get("/course", verifyJWT, getCourses);
adminRouter.post("/course/add", verifyJWT, addCourse);
adminRouter.delete("/course/:id", verifyJWT, deleteCourse);
adminRouter.put("/course/:id", verifyJWT, updateCourse);

adminRouter.get("/department", verifyJWT, getDepartments);
adminRouter.post("/department/add", verifyJWT, addDepartment);
adminRouter.put("/department/:id", verifyJWT, updateDepartment);

export default adminRouter;
