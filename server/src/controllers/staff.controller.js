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
    await db.query(`CREATE OR REPLACE VIEW newView AS SELECT S.rollno, C.courseid, S.fullname, C.coursename, C.deptcode, T.sem, T.year FROM takes T JOIN students S ON T.rollno=S.rollno JOIN course C ON T.courseid=C.courseid WHERE staffid=${staffid};`);
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
    const response = await db.query("SELECT rollno, fullname, coursename, deptcode, sem, year, courseid FROM newView WHERE courseid=$1;", [c_id]);
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
export async function getMarksAttendance(req, res, next){
  try {
    const rollno = req.query.roll;
    const cId = req.query.cid;
    const sem = req.query.sem;
    const year = req.query.year;
    const response = await db.query("Select courseid, attendance, sem, internals, externals FROM marks WHERE rollno=$1 AND courseid=$2 AND sem=$3 AND year=$4;" ,[rollno, cId, sem, year]);
    //Select courseid, attendance, sem, internals, externals FROM marks WHERE rollno=$1 AND courseid=$2 AND sem=$3 AND year=$4;
    res.status(200).json({data: response.rows[0], message: "getMarks les go"});
  } catch (error) {
    next(error);
  }
}

export async function updateMarks(req, res, next){
  try {
    const response = await db.query("UPDATE marks SET internals=$1, externals=$2, attendance=$3 WHERE rollno=$4 AND courseid=$5 AND sem=$6 AND year=$7", [req.body.internals, req.body.externals, req.body.attendance, req.body.rollno, req.body.courseid, req.body.sem, req.body.year]);
    res.status(200).json({message:"Student details", data: response.rows});
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