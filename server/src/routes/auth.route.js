import express from "express";
import {
  studentSignInController,
  studentSignUpController,
  staffSignInController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/student/signup", studentSignUpController);
authRouter.post("/student/signin", studentSignInController);
authRouter.post("/staff/signin", staffSignInController);

export default authRouter;
