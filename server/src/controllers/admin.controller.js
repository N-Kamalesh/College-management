import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const MOB_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
const RNO_REGEX = /^20[\d]{8}$/;
const SID_REGEX = /^2[\d]{3}$/;

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
    await db.query("DELETE FROM announcements WHERE announcement_id = $1", [
      id,
    ]);
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
      "SELECT department.deptcode,deptname,hod_id,fullname,email,mobile,highest_qualification FROM department JOIN staff on staffid = hod_id ORDER BY deptcode"
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
      "SELECT courseid, coursename, course.deptcode, credits, deptname FROM course JOIN department ON department.deptcode = course.deptcode ORDER BY courseid"
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
    await db.query("DELETE FROM course WHERE courseid = $1", [id]);
    res
      .status(200)
      .json({ message: "Course deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function getStudents(req, res, next) {
  try {
    const response = await db.query(
      "SELECT fullname, rollno, email, mobile, address, gender, dob, sem, joinyear, students.deptcode, deptname FROM students JOIN department ON department.deptcode = students.deptcode ORDER BY rollno"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addStudent(req, res, next) {
  const {
    fullname,
    rollno,
    address,
    email,
    mobile,
    gender,
    password,
    dob,
    joinyear,
    deptcode,
  } = req.body;
  const validPwd = PWD_REGEX.test(password);
  const validEmail = EMAIL_REGEX.test(email);
  const validMob = MOB_REGEX.test(mobile);
  const validRno = RNO_REGEX.test(rollno);
  const validYear =
    Number(joinyear) < new Date().getFullYear() && Number(joinyear) > 2000;

  if (
    !address.trim() ||
    !fullname.trim() ||
    !String(dob).trim() ||
    !validPwd ||
    !validMob ||
    !validRno ||
    !validEmail ||
    !validYear ||
    !String(deptcode).trim()
  )
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    await db.query(
      "INSERT INTO students(rollno, fullname, gender, dob, email, address, mobile, password, deptcode, joinyear) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        Number(rollno),
        fullname,
        gender,
        dob,
        email,
        address,
        mobile,
        hashedPassword,
        Number(deptcode),
        Number(joinyear),
      ]
    );
    res
      .status(200)
      .json({ success: true, message: "Student added successfully!" });
  } catch (error) {
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("rollno")
    )
      return next(errorHandler(409, "Roll Number already exists."));
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("email")
    )
      return next(errorHandler(409, "Email already exists."));

    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("mobile")
    )
      return next(errorHandler(409, "Mobile Number already exists."));
    next(error);
  }
}

export async function updateStudent(req, res, next) {
  const id = req.params.id;
  const {
    fullname,
    rollno,
    address,
    email,
    mobile,
    gender,
    dob,
    joinyear,
    deptcode,
  } = req.body;
  const validEmail = EMAIL_REGEX.test(email);
  const validMob = MOB_REGEX.test(mobile);
  const validRno = RNO_REGEX.test(rollno);
  const validYear =
    Number(joinyear) < new Date().getFullYear() && Number(joinyear) > 2000;

  if (
    !address.trim() ||
    !fullname.trim() ||
    !String(dob).trim() ||
    !validMob ||
    !validRno ||
    !validEmail ||
    !validYear ||
    !String(deptcode).trim()
  )
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "UPDATE students SET rollno = $1, fullname = $2, gender = $3, dob = $4, email = $5, address = $6, mobile = $7, deptcode = $8, joinyear = $9 WHERE rollno = $10",
      [
        Number(rollno),
        fullname,
        gender,
        dob,
        email,
        address,
        mobile,
        Number(deptcode),
        Number(joinyear),
        Number(id),
      ]
    );
    res
      .status(200)
      .json({ success: true, message: "Student updated successfully!" });
  } catch (error) {
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("rollno")
    )
      return next(errorHandler(409, "Roll Number already exists."));
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("email")
    )
      return next(errorHandler(409, "Email already exists."));

    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("mobile")
    )
      return next(errorHandler(409, "Mobile Number already exists."));
    next(error);
  }
}

export async function deleteStudent(req, res, next) {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM students WHERE rollno = $1", [Number(id)]);
    res
      .status(200)
      .json({ message: "Student deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function getStaffs(req, res, next) {
  try {
    const response = await db.query(
      "SELECT fullname, staffid, email, mobile, gender, designation, highest_qualification, joindate, staff.deptcode, deptname FROM staff JOIN department ON department.deptcode = staff.deptcode ORDER BY staffid"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addStaff(req, res, next) {
  const {
    fullname,
    staffid,
    email,
    mobile,
    designation,
    password,
    gender,
    joindate,
    highest_qualification,
    deptcode,
  } = req.body;
  const validPwd = PWD_REGEX.test(password);
  const validEmail = EMAIL_REGEX.test(email);
  const validMob = MOB_REGEX.test(mobile);
  const validSId = SID_REGEX.test(staffid);
  if (
    !fullname.trim() ||
    !String(joindate).trim() ||
    !validPwd ||
    !validMob ||
    !validSId ||
    !validEmail ||
    !designation.trim() ||
    !highest_qualification.trim() ||
    !String(deptcode).trim()
  )
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    await db.query(
      "INSERT INTO staff(staffid, fullname, gender, joindate, email, designation, mobile, password, deptcode, highest_qualification) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        Number(staffid),
        fullname,
        gender,
        joindate,
        email,
        designation,
        mobile,
        hashedPassword,
        Number(deptcode),
        highest_qualification,
      ]
    );
    res
      .status(200)
      .json({ success: true, message: "Staff added successfully!" });
  } catch (error) {
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("staffid")
    )
      return next(errorHandler(409, "Staff Id already exists."));
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("email")
    )
      return next(errorHandler(409, "Email already exists."));

    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("mobile")
    )
      return next(errorHandler(409, "Mobile Number already exists."));
    next(error);
  }
}

export async function updateStaff(req, res, next) {
  const id = req.params.id;
  const {
    fullname,
    staffid,
    email,
    mobile,
    designation,
    gender,
    joindate,
    highest_qualification,
    deptcode,
  } = req.body;
  const validEmail = EMAIL_REGEX.test(email);
  const validMob = MOB_REGEX.test(mobile);
  const validSId = SID_REGEX.test(staffid);
  if (
    !fullname.trim() ||
    !String(joindate).trim() ||
    !validMob ||
    !validSId ||
    !validEmail ||
    !designation.trim() ||
    !highest_qualification.trim() ||
    !String(deptcode).trim()
  )
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "UPDATE staff set staffid = $1, fullname = $2, gender = $3, joindate = $4, email = $5, designation = $6, mobile = $7,  deptcode = $8, highest_qualification = $9 WHERE staffid = $10",
      [
        Number(staffid),
        fullname,
        gender,
        joindate,
        email,
        designation,
        mobile,
        Number(deptcode),
        highest_qualification,
        id,
      ]
    );
    res
      .status(200)
      .json({ success: true, message: "Staff updated successfully!" });
  } catch (error) {
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("staffid")
    )
      return next(errorHandler(409, "Staff Id already exists."));
    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("email")
    )
      return next(errorHandler(409, "Email already exists."));

    if (
      error?.detail?.includes("already exists") &&
      error?.detail?.includes("mobile")
    )
      return next(errorHandler(409, "Mobile Number already exists."));
    next(error);
  }
}

export async function deleteStaff(req, res, next) {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM staff WHERE staffid = $1", [Number(id)]);
    res
      .status(200)
      .json({ message: "Staff deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function getTeaches(req, res, next) {
  try {
    const response = await db.query(
      "SELECT teaches.staffid, staff.fullname, teaches.courseid, course.coursename, teaches.sem, teaches.year, teaches.deptcode, department.deptname FROM teaches JOIN department on department.deptcode = teaches.deptcode JOIN course ON course.courseid = teaches.courseid JOIN staff ON staff.staffid = teaches.staffid ORDER BY staffid"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addTeaches(req, res, next) {
  const { staffid, courseid, deptcode, sem, year } = req.body;
  const validSem = sem ? Number(sem) >= 1 && Number(sem) <= 8 : false;
  const validSId = SID_REGEX.test(staffid);
  const validYear =
    Number(year) > 2000 && Number(year) <= new Date().getFullYear();
  if (
    !courseid.trim() ||
    !validSId ||
    !validSem ||
    !validYear ||
    !String(deptcode).trim()
  )
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "INSERT INTO teaches(staffid, courseid, sem, year, deptcode) VALUES ($1,$2,$3,$4,$5)",
      [Number(staffid), courseid, Number(sem), Number(year), Number(deptcode)]
    );
    res
      .status(200)
      .json({ success: true, message: "Teaches added successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function updateTeaches(req, res, next) {
  const id = JSON.parse(req.params.id);
  const { staffid, courseid, deptcode, sem, year } = req.body;
  const {
    staffid: oldStaffId,
    courseid: OldCourseId,
    deptcode: oldDeptcode,
    sem: oldSem,
    year: oldYear,
  } = id;

  const validSem = sem ? Number(sem) >= 1 && Number(sem) <= 8 : false;
  const validSId = SID_REGEX.test(staffid);
  const validYear =
    Number(year) > 2000 && Number(year) <= new Date().getFullYear();
  if (
    !courseid.trim() ||
    !validSId ||
    !validSem ||
    !validYear ||
    !String(deptcode).trim()
  )
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "UPDATE teaches SET staffid = $1, courseid = $2, sem = $3, year = $4, deptcode = $5 WHERE staffid = $6 AND courseid = $7 AND sem = $8 AND year = $9 AND deptcode = $10",
      [
        Number(staffid),
        courseid,
        Number(sem),
        Number(year),
        Number(deptcode),
        Number(oldStaffId),
        OldCourseId,
        Number(oldSem),
        Number(oldYear),
        Number(oldDeptcode),
      ]
    );
    res
      .status(200)
      .json({ success: true, message: "Teaches updated successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function deleteTeaches(req, res, next) {
  const id = JSON.parse(req.params.id);
  const { staffid, courseid, deptcode, sem, year } = id;
  try {
    await db.query(
      "DELETE FROM teaches WHERE staffid = $1 AND courseid = $2 AND sem = $3 AND year = $4 AND deptcode = $5",
      [Number(staffid), courseid, Number(sem), Number(year), Number(deptcode)]
    );
    res
      .status(200)
      .json({ message: "Teaches deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function getTakes(req, res, next) {
  try {
    const response = await db.query(
      "SELECT takes.rollno, students.fullname studentname, takes.staffid, staff.fullname staffname, takes.courseid, course.coursename, takes.sem, takes.year, students.deptcode, department.deptname FROM takes JOIN students ON takes.rollno = students.rollno JOIN department ON department.deptcode = students.deptcode JOIN course ON course.courseid = takes.courseid JOIN staff ON staff.staffid = takes.staffid ORDER BY takes.rollno"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addTakes(req, res, next) {
  const { staffid, courseid, rollno, sem, year } = req.body;
  const validSem = sem ? Number(sem) >= 1 && Number(sem) <= 8 : false;
  const validSId = SID_REGEX.test(staffid);
  const validYear =
    Number(year) > 2000 && Number(year) <= new Date().getFullYear();
  const validRno = RNO_REGEX.test(rollno);
  if (!courseid.trim() || !validSId || !validSem || !validYear || !validRno)
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "INSERT INTO takes(staffid, courseid, sem, year, rollno) VALUES ($1,$2,$3,$4,$5)",
      [Number(staffid), courseid, Number(sem), Number(year), Number(rollno)]
    );
    res
      .status(200)
      .json({ success: true, message: "Takes added successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function updateTakes(req, res, next) {
  const id = JSON.parse(req.params.id);
  const { staffid, courseid, rollno, sem, year } = req.body;
  const {
    staffid: oldStaffId,
    courseid: OldCourseId,
    rollno: oldRollno,
    sem: oldSem,
    year: oldYear,
  } = id;

  const validSem = sem ? Number(sem) >= 1 && Number(sem) <= 8 : false;
  const validSId = SID_REGEX.test(staffid);
  const validYear =
    Number(year) > 2000 && Number(year) <= new Date().getFullYear();
  const validRno = RNO_REGEX.test(rollno);
  if (!courseid.trim() || !validSId || !validSem || !validYear || !validRno)
    return next(errorHandler(422, "Please provide all values properly"));
  try {
    await db.query(
      "UPDATE takes SET staffid = $1, courseid = $2, sem = $3, year = $4, rollno = $5 WHERE staffid = $6 AND courseid = $7 AND sem = $8 AND year = $9 AND rollno = $10",
      [
        Number(staffid),
        courseid,
        Number(sem),
        Number(year),
        Number(rollno),
        Number(oldStaffId),
        OldCourseId,
        Number(oldSem),
        Number(oldYear),
        Number(oldRollno),
      ]
    );
    res
      .status(200)
      .json({ success: true, message: "Takes updated successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function deleteTakes(req, res, next) {
  const id = JSON.parse(req.params.id);
  const { staffid, courseid, rollno, sem, year } = id;
  try {
    await db.query(
      "DELETE FROM takes WHERE staffid = $1 AND courseid = $2 AND sem = $3 AND year = $4 AND rollno = $5",
      [Number(staffid), courseid, Number(sem), Number(year), Number(rollno)]
    );
    res
      .status(200)
      .json({ message: "Takes deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
}

