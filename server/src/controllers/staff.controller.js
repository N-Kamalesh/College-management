import db from "../config/db.js";
import { errorHandler } from "../utils/error.js";

export async function getStaffData(req, res, next){
  const staff_id = req.params.id;
  // console.log(req.body);
  try {
    const response = await db.query("SELECT * FROM staff WHERE staffid = $1", [staff_id]);
    res.status(200).json({ data: response.rows[0], success: true });
  } catch (error) {
    next(error);
  }
}

export function staffController(req, res) {
  res.json({ message: "Hello minna san" });
}
