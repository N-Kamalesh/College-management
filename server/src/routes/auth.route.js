import express from "express";
import {
  studentSignInController,
  studentSignUpController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/student/signup", studentSignUpController);
authRouter.post("/student/signin", studentSignInController);

export default authRouter;
