import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { createJWT } from "../utils/jwt.js";

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
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("rollno")
    )
      return next(
        errorHandler(409, "Roll Number already exists. Please Login!")
      );
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("email")
    )
      return next(
        errorHandler(
          409,
          "Email already exists. Please use another email or login!"
        )
      );
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("mobile")
    )
      return next(
        errorHandler(
          409,
          "Mobile Number already exists. Please use another number or login!"
        )
      );
    next(error);
  }
}

export function staffSignInController(req, res) {
  console.log(req.body);
  res.send("User trying to sign in");
}

export async function studentSignInController(req, res, next) {
  console.log(req.body);
  const token = req.cookies?.token;
  console.log(token);
  const { rollno, password } = req.body;
  try {
    const response = await db.query("SELECT * FROM students WHERE rollno=$1", [
      rollno,
    ]);
    if (!response.rowCount) {
      return next(errorHandler(404, "Student not found!"));
    } else {
      const validPwd = bcryptjs.compareSync(
        password,
        response.rows[0].password
      );
      if (!validPwd) return next(errorHandler(401, "Wrong password!"));
      const { password: hashedPassword, ...data } = response.rows[0];
      const token = createJWT(data);
      const expiryDate = new Date(Date.now()) + 1 * 86400 * 1000;
      res.cookie("accessToken", token, {
        httpOnly: true,
        // expires: expiryDate,
        sameSite: "None",
        secure: false,
      });
      console.log(token);
      res.status(200).json({ ...data, success: true });
    }
  } catch (error) {
    next(error);
  }
}
