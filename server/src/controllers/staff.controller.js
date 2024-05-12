import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";

export async function getStaffData(req, res, next){
  const staff_id = req.params.id;
  // console.log(req.body);
  try {
    const response = await db.query("SELECT * FROM staff WHERE staffid = $1;", [staff_id]);
    res.status(200).json({ data: response.rows[0], success: true });
  } catch (error) {
    next(error);
  }
}

export async function newView(req, res, next){
  const staffid = req.query.staffid;
  try {
    await db.query(`CREATE OR REPLACE VIEW newView AS SELECT S.rollno, C.courseid, S.fullname, C.coursename, C.deptcode FROM takes T JOIN students S ON T.rollno=S.rollno JOIN course C ON T.courseid=C.courseid WHERE staffid=${staffid};`);
    res.status(200).json({message: "Works!"});
  } catch (error) {
    console.log("Error occured in creating view");
    next(error);
  }
}

export async function getCourses(req, res, next){
  try {
    const response = await db.query("SELECT DISTINCT courseid, coursename FROM newView;");
    res.status(200).json({data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function getStudents(req, res, next){
  try {
    const c_id = req.query.c_id;
    const response = await db.query("SELECT rollno, fullname, coursename, deptcode FROM newView WHERE courseid=$1;", [c_id]);
    res.status(200).json({data: response.rows, success: true});
  } catch (error) {
    next(error);
  }
}

export async function getALLStudents(req, res, next){
  try {
    const response = await db.query("SELECT * FROM newView;");
    res.status(200).json({data: response.rows, success: true});
  } catch (error) {
    next(error);
  }
}

export function staffController(req, res) {
  res.json({ message: "Hello minna san" });
}

/*
  CREATE OR REPLACE VIEW studentStaffCourseView AS 
*/