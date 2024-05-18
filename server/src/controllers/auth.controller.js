import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { createJWT } from "../utils/jwt.js";

export async function adminSignInController(req, res, next) {
  const { email, password } = req.body;
  try {
    const response = await db.query("SELECT * FROM admin WHERE email=$1", [
      email,
    ]);
    if (!response.rowCount) {
      return next(errorHandler(404, "Admin not found!"));
    } else {
      const validPwd = bcryptjs.compareSync(
        password,
        response.rows[0].password
      );

      if (!validPwd) return next(errorHandler(401, "Wrong password!"));
      const { password: hashedPassword, ...data } = response.rows[0];
      const token = createJWT({ email });
      res.status(200).json({ data, token, success: true });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function staffSignInController(req, res, next) {
  const { staffId, password } = req.body;
  try {
    const response = await db.query(
      "SELECT staffid,fullname,gender,email,mobile,password, staff.deptcode,deptname,highest_qualification,designation,joindate FROM staff JOIN department ON department.deptcode = staff.deptcode WHERE staffId=$1",
      [staffId]
    );
    if (!response.rowCount) {
      return next(errorHandler(404, "Staff not found!"));
    } else {
      const validPwd = bcryptjs.compareSync(
        password,
        response.rows[0].password
      );
      if (!validPwd) return next(errorHandler(401, "Wrong password!"));
      const { rowCount } = await db.query(
        "SELECT * FROM staff JOIN department ON department.hod_id = staff.staffId WHERE staffId=$1",
        [staffId]
      );
      let isHod = false;
      if (rowCount) isHod = true;
      const { password: hashedPassword, ...data } = response.rows[0];
      const token = createJWT({ staffId });
      res.status(200).json({ data, token, isHod, success: true });
      console.log("here");
    }
  } catch (error) {
    next(error);
  }
}

export async function studentSignInController(req, res, next) {
  console.log("Inside student controller");
  const { rollno, password } = req.body;
  try {
    const response = await db.query(
      "SELECT rollno,fullname,email,password,mobile,address,gender,dob,students.deptcode,sem,joinyear,deptname FROM students JOIN department on department.deptcode = students.deptcode WHERE rollno=$1",
      [rollno]
    );
    if (!response.rowCount) {
      return next(errorHandler(404, "Student not found!"));
    } else {
      const validPwd = bcryptjs.compareSync(
        password,
        response.rows[0].password
      );
      if (!validPwd) return next(errorHandler(401, "Wrong password!"));
      const { password: hashedPassword, ...data } = response.rows[0];
      const token = createJWT({ rollno });
      res.status(200).json({ data, token, success: true });
    }
  } catch (error) {
    next(error);
  }
}
