import db from "../config/db.js";

export function studentController(req, res) {
  res.json({ message: "Hello minna san" });
}

export async function studentCourses(req, res, next) {
  try {
    const rollno = req.query.rollno;
    const sem = req.query.sem;
    const response = await db.query("SELECT staff.fullname AS fullname, course.coursename, course.deptcode, staff.designation FROM takes JOIN students ON takes.rollno=students.rollno JOIN staff ON staff.staffid=takes.staffid JOIN course ON course.courseid=takes.courseid WHERE students.rollno=$1 AND takes.sem=$2;", [rollno, sem]);
    res.status(200).json({ data: response.rows, success: true, message:"working" });
  } catch (error) {
    next(error);
  }
}