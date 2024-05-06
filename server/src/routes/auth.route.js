import express from "express";
import {
  studentSignInController,
  adminSignInController,
  staffSignInController,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../utils/jwt.js";

const authRouter = express.Router();

authRouter.post("/admin/signin", adminSignInController);
authRouter.post("/student/signin", studentSignInController);
authRouter.post("/staff/signin", staffSignInController);

export default authRouter;
