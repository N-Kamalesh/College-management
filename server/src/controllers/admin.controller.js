import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";
import crypto from "crypto";

export async function getAnnouncements(req, res, next) {
  try {
    const response = await db.query("SELECT * FROM announcements");
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}
export async function addAnnouncement(req, res, next) {
  const { title, content, deptcode } = req.body;
  if (!title?.trim() || !content?.trim() || !deptcode.trim())
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
  if (!title?.trim() || !content?.trim() || !deptcode.trim())
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
