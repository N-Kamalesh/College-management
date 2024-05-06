import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export function createJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10d" });
}

export function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return next(errorHandler(401, "You are not authenticated. Please Login"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden. Token is not valid!"));
    req.user = user;
    next();
  });
}
