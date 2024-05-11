import db from "../config/db.js";

export function studentController(req, res) {
  res.json({ message: "Hello minna san" });
}

export async function studentCourses(req, res, next) {
  try {
    const rollno = req.query.rollno;
    const sem = req.query.sem;
    const response = await db.query("SELECT staff.fullname AS fullname, coursename, deptcode, designation FROM takes NATURAL JOIN students NATURAL JOIN staff NATURAL JOIN course WHERE rollno=$1 AND takes.sem=$2;", [rollno, sem]);
    res.status(200).json({ data: response.rows, success: true, message:"working" });
  } catch (error) {
    next(error);
  }
}