import db from "../config/db.js";
import "dotenv/config";
import { errorHandler } from "../utils/error.js";
import nodemailer from 'nodemailer';


let {MAIL_USER, MAIL_PASS} = process.env;
const transporter  = nodemailer.createTransport(
  {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  }
);


export async function newView(req, res, next) {
  const staffid = req.query.staffid;

  const D = new Date();
  const month = D.getMonth();
  let semType = "";
  if (month < 11 && month >= 6) semType = "odd";
  else semType = "even";

  const sems = {
    odd: "(1,3,5,7)",
    even: "(2,4,6,8)",
  };

  try {
    await db.query(
      `CREATE OR REPLACE VIEW newView AS SELECT S.rollno, C.courseid, S.fullname, C.coursename, C.deptcode, T.sem, T.year FROM takes T JOIN students S ON T.rollno=S.rollno JOIN course C ON T.courseid=C.courseid WHERE staffid=${staffid}  AND t.year = EXTRACT(YEAR FROM CURRENT_DATE) AND t.sem IN ${sems[semType]};`
    );
    res
      .status(200)
      .json({ message: "Successfully created view", success: true });
  } catch (error) {
    next(errorHandler(500, "Error occured in creating view"));
  }
}

export async function getCourses(req, res, next) {
  try {
    const response = await db.query(
      "SELECT DISTINCT courseid, coursename FROM newView;"
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function getStudents(req, res, next) {
  try {
    const c_id = req.query.c_id;
    const response = await db.query(
      "SELECT rollno, fullname, coursename, deptcode, sem, year, courseid FROM newView WHERE courseid=$1;",
      [c_id]
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function getAllStudents(req, res, next) {
  try {
    const response = await db.query("SELECT * FROM newView;");
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}
export async function getMarksAttendance(req, res, next) {
  try {
    const rollno = req.query.roll;
    const cId = req.query.cid;
    const sem = req.query.sem;
    const year = req.query.year;
    const response = await db.query(
      "Select * FROM marks WHERE rollno=$1 AND courseid=$2 AND sem=$3 AND year=$4;",
      [rollno, cId, sem, year]
    );
    res
      .status(200)
      .json({ data: response.rows[0], message: "getMarks les go" });
  } catch (error) {
    next(error);
  }
}

export async function updateMarks(req, res, next) {
  try {
    const response = await db.query(
      "UPDATE marks SET internals=$1, externals=$2, attendance=$3 WHERE rollno=$4 AND courseid=$5 AND sem=$6 AND year=$7",
      [
        req.body.internals,
        req.body.externals,
        req.body.attendance,
        req.body.rollno,
        req.body.courseid,
        req.body.sem,
        req.body.year,
      ]
    );
    res.status(200).json({ message: "Student details", data: response.rows });
  } catch (error) {
    next(errorHandler(500, "Error occured in updating the marks"));
  }
}

export async function getStudentInfo(req, res, next) {
  try {
    const response = await db.query("SELECT * FROM students WHERE rollno=$1", [
      req.query.rollno,
    ]);
    res.status(200).json({
      data: response.rows[0],
      message: "Success Getting student detail",
    });
  } catch (error) {
    next(error);
  }
}

export async function getAnnouncements(req, res, next) {
  const deptcode = req.params.id;
  try {
    const response = await db.query(
      "SELECT announcement_id,title,content,created_at,updated_at,announcements.deptcode,deptname FROM announcements JOIN department ON department.deptcode = announcements.deptcode WHERE announcements.deptcode = $1",
      [Number(deptcode)]
    );
    res.status(200).json({
      data: response.rows,
      message: "Announcemenets fetched successfully",
      success: true,
    });
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
    const response = await db.query("SELECT email from students WHERE deptcode = $1;", [deptcode]);
    response.rows.forEach(item => {
    const mailOptions = {
      from: {
        name: 'College DB',
        address: MAIL_PASS,
      },
      to: [item.email],
      subject: 'New Announcement Alert!',
      text: content.trim(),
      html: `<h1>${title.trim()}</h1><pre>${content.trim()}</pre>`,
    }
    sendMail(transporter, mailOptions)
    })
  } catch (error) {
    console.error(error);
  }
  
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
async function sendMail(transporter, mailOptions){
  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail Sent");
  } catch (error) {
    console.log(error);
  }
}