import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";

export async function getStaffData(req, res, next){
  const staff_id = req.params.id;
  // console.log(req.body);
  try {
    const response = await db.query("SELECT * FROM staff WHERE staffid = $1", [staff_id]);
    res.status(200).json({ data: response.rows[0], success: true });
  } catch (error) {
    next(error);
  }
}

export async function newView(res, req, next){
  const staffid = req.body.id;
  try {
    await db.query("CREATE OR REPLACE VIEW studentStaffCourseView AS SELECT rollno, courseid, fullname, coursename, deptcode FROM takes T JOIN students S ON T.rollno=S.rollno JOIN course C ON T.courseid=C.courseid WHERE staffid-$1", [staffid]);
  } catch (error) {
    next(error);
  }
}

export async function getCourses(req, res, next){
  try {
    console.log("Inside controller");
    const response = await db.query("SELECT DISTINCT courseid, coursename FROM studentStaffCourseView");
    res.status(200).json({data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function getStudents(req, res, next){
  try {
    const c_id = req.query.c_id;
    console.log("Inside getStudent controller");
    const response = await db.query("SELECT rollno, fullname, coursename, deptcode FROM studentStaffCourseView courseid=$1", [c_id]);
    res.status(200).json({data: response.rows, success: true});
  } catch (error) {
    next(error);
  }
}

export async function getALLStudents(req, res, next){
  try {
    const response = await db.query("SELECT * FROM studentStaffCourseView");
    res.status(200).json({data: response.rows, success: true});
  } catch (error) {
    next(error);
  }
}

export function staffController(req, res) {
  res.json({ message: "Hello minna san" });
}
