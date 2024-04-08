import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export async function studentSignUpController(req, res, next) {
  const {
    fullName,
    address,
    rollno,
    batch,
    gender,
    deptCode,
    sem,
    dob,
    mobile,
    email,
    year,
    password,
  } = req.body;
  console.log(req.body);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const response = await db.query(
      "INSERT INTO students(rollno, fullName, address,batch,gender,deptcode,sem,dob,year,mobile,email,password) VALUES($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12)",
      [
        rollno,
        fullName,
        address,
        batch,
        gender,
        deptCode,
        sem,
        dob,
        year,
        mobile,
        email,
        hashedPassword,
      ]
    );
    console.log("hi");
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("rollno")
    )
      next(errorHandler(409, "Roll Number already exists. Please Login!"));
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("email")
    )
      next(
        errorHandler(
          409,
          "Email already exists. Please use another email or login!"
        )
      );
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("mobile")
    )
      next(
        errorHandler(
          409,
          "Mobile Number already exists. Please use another number or login!!"
        )
      );
    next(error);
  }
}

export function studentSignInController(req, res) {
  console.log(req.body);
  res.send("User trying to sign in");
}

export function staffSignInController(req, res) {}
