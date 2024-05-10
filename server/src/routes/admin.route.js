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
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../utils/jwt.js";

const adminRouter = express.Router();

adminRouter.get("/announcement", verifyJWT, getAnnouncements);
adminRouter.post("/announcement/add", verifyJWT, addAnnouncement);
adminRouter.delete("/announcement/:id", verifyJWT, deleteAnnouncement);
adminRouter.put("/announcement/:id", verifyJWT, updateAnnouncement);

adminRouter.get("/course", verifyJWT, getCourses);
adminRouter.post("/course/add", verifyJWT, addCourse);
adminRouter.delete("/course/:id", verifyJWT, deleteCourse);
adminRouter.put("/course/:id", verifyJWT, updateCourse);

adminRouter.get("/department", verifyJWT, getDepartments);
adminRouter.post("/department/add", verifyJWT, addDepartment);
adminRouter.put("/department/:id", verifyJWT, updateDepartment);

export default adminRouter;
