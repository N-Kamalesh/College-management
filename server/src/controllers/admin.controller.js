import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";
import crypto from "crypto";

export async function getAnnouncements(req, res, next) {
  try {
    const response = await db.query(
      "SELECT announcement_id,title,content,created_at,updated_at,announcements.deptcode,deptname FROM announcements JOIN department on department.deptcode = announcements.deptcode;"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addAnnouncement(req, res, next) {
  const { title, content, deptcode } = req.body;
  if (!title?.trim() || !content?.trim() || !String(deptcode).trim())
    return next(errorHandler(422, "Please provide all values properly"));
  const id = crypto.randomUUID();
  try {
    await db.query(
      "INSERT INTO announcements(announcement_id,title,content,deptcode) VALUES ($1,$2,$3,$4)",
      [id, title.trim(), content.trim(), Number(deptcode)]
    );
    res
      .status(200)
      .json({ success: true, message: "Announcement added successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function deleteAnnouncement(req, res, next) {
  const id = req.params.id;
  try {
    const response = await db.query(
      "DELETE FROM announcements WHERE announcement_id = $1",
      [id]
    );
    res
      .status(200)
      .json({ message: "Announcement deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function updateAnnouncement(req, res, next) {
  const id = req.params.id;
  const { title, content, deptcode } = req.body;
  if (!title?.trim() || !content?.trim() || !String(deptcode).trim())
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "UPDATE announcements set title = $1, content = $2, deptcode = $3 where announcement_id = $4 ",
      [title.trim(), content.trim(), Number(deptcode), id]
    );
    res
      .status(200)
      .json({ success: true, message: "Announcement updated successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function getDepartments(req, res, next) {
  try {
    const response = await db.query(
      "SELECT department.deptcode,deptname,hod_id,fullname,email,mobile,highest_qualification FROM department JOIN staff on staffid = hod_id"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addDepartment(req, res, next) {
  const { deptname, hod_id, deptcode } = req.body;
  if (!deptname?.trim() || !String(hod_id)?.trim() || !String(deptcode).trim())
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "INSERT INTO department(deptname,hod_id,deptcode) VALUES ($1,$2,$3)",
      [deptname.trim(), Number(hod_id), Number(deptcode)]
    );
    res
      .status(200)
      .json({ success: true, message: "Department added successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function updateDepartment(req, res, next) {
  const deptcode = req.params.id;
  const { deptname, hod_id, deptcode: newDeptcode } = req.body;
  console.log(req.body);
  if (
    !deptname?.trim() ||
    !String(hod_id)?.trim() ||
    !String(newDeptcode).trim()
  )
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "UPDATE department set deptname = $1, hod_id = $2, deptcode = $3 where deptcode = $4 ",
      [deptname.trim(), Number(hod_id), Number(newDeptcode), Number(deptcode)]
    );
    res
      .status(200)
      .json({ success: true, message: "Department updated successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function getCourses(req, res, next) {
  try {
    const response = await db.query(
      "SELECT courseid, coursename, course.deptcode, credits, deptname FROM course JOIN department ON department.deptcode = course.deptcode"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addCourse(req, res, next) {
  let { courseid, coursename, credits, deptcode } = req.body;
  credits = Number(credits);
  if (isNaN(credits))
    return next(errorHandler(422, "Please enter valid credits"));
  if (credits < 0 || credits > 9)
    return next(errorHandler(422, "Please enter valid credits"));
  if (!coursename.trim() || !courseid.trim() || !String(deptcode).trim())
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "INSERT INTO course(courseid, coursename, credits, deptcode) VALUES ($1,$2,$3,$4)",
      [courseid, coursename, credits, Number(deptcode)]
    );
    res
      .status(200)
      .json({ success: true, message: "Course added successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function updateCourse(req, res, next) {
  const courseid = req.params.id;
  let { courseid: newCourseId, coursename, credits, deptcode } = req.body;
  credits = Number(credits);
  if (isNaN(credits))
    return next(errorHandler(422, "Please enter valid credits"));
  if (credits < 0 || credits > 9)
    return next(errorHandler(422, "Please enter valid credits"));
  if (!coursename.trim() || !courseid.trim() || !String(deptcode).trim())
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "UPDATE course SET courseid = $1, coursename = $2, credits = $3, deptcode = $4 WHERE courseid = $5",
      [newCourseId, coursename, credits, Number(deptcode), courseid]
    );
    res
      .status(200)
      .json({ success: true, message: "Course updated successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function deleteCourse(req, res, next) {
  const id = req.params.id;
  try {
    const response = await db.query("DELETE FROM course WHERE courseid = $1", [
      id,
    ]);
    res
      .status(200)
      .json({ message: "Course deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
}
