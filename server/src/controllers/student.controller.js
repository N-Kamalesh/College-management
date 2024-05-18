import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";

export async function getCourses(req, res, next) {
  const { rollno, sem } = req.query;
  if (Number(req.user.rollno) !== Number(rollno)) {
    return next(errorHandler(403, "You can only access your courses"));
  }
  try {
    const response = await db.query(
      "SELECT staff.fullname AS fullname, course.coursename, course.deptcode, staff.designation FROM takes JOIN students ON takes.rollno=students.rollno JOIN staff ON staff.staffid=takes.staffid JOIN course ON course.courseid=takes.courseid WHERE students.rollno=$1 AND takes.sem=$2;",
      [Number(rollno), Number(sem)]
    );
    res.status(200).json({
      data: response.rows,
      success: true,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function getMarks(req, res, next) {
  const rollno = req.params.id;
  if (Number(req.user.rollno) !== Number(rollno)) {
    return next(errorHandler(403, "You can only access your marks"));
  }
  try {
    const response = await db.query(
      "SELECT marks.courseid, coursename, credits, rollno, attendance, sem, year, internals, externals, total, grade FROM marks JOIN course ON course.courseid = marks.courseid WHERE rollno=$1 ORDER BY sem, courseid",
      [Number(rollno)]
    );
    res.status(200).json({
      data: response.rows,
      success: true,
      message: "Marks fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}
