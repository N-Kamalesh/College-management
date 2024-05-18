import express from "express";
import { getMarks, getCourses } from "../controllers/student.controller.js";
import { verifyJWT } from "../utils/jwt.js";

const studentRouter = express.Router();

studentRouter.get("/dashboard", verifyJWT, getCourses);
studentRouter.get("/marks/:id", verifyJWT, getMarks);

export default studentRouter;
