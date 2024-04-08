import express from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You hit the school db route!");
});

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

router.use("*", (req, res) => {
  res.json({ message: "404 Not found", success: false });
});

export default router;
