import express from "express";
import {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../utils/jwt.js";

const adminRouter = express.Router();

adminRouter.get("/announcement", verifyJWT, getAnnouncements);
adminRouter.post("/announcement/add", verifyJWT, addAnnouncement);
adminRouter.delete("/announcement/:id", verifyJWT, deleteAnnouncement);
adminRouter.put("/announcement/:id", verifyJWT, updateAnnouncement);

export default adminRouter;
