import db from "../config/db.js";

export function studentController(req, res) {
  res.json({ message: "Hello minna san" });
}

export async function studentCourses(req, res, next) {
  const { rollno, sem } = req.query;
  try {
    const response = await db.query(
      "SELECT staff.fullname AS fullname, course.coursename, course.deptcode, staff.designation FROM takes JOIN students ON takes.rollno=students.rollno JOIN staff ON staff.staffid=takes.staffid JOIN course ON course.courseid=takes.courseid WHERE students.rollno=$1 AND takes.sem=$2;",
      [rollno, sem]
    );
    res
      .status(200)
      .json({
        data: response.rows,
        success: true,
        message: "Courses fetched successfully",
      });
  } catch (error) {
    next(error);
  }
}
