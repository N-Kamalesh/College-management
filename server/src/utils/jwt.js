import jwt from "jsonwebtoken";

export function createJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 1 * 86400,
    algorithm: "HS256",
  });
}

export function verifyJWT(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (err) {
    return null;
  }
}
