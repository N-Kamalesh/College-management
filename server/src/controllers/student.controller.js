export function studentController(req, res) {
  res.json({ message: "Hello minna san" });
}

export async function studentCourses(req, res, next) {
  try {
    const rollno = req.body.rollno;
    const sem = req.body.sem;
    console.log(rollno+sem);
    // const response = await db.query("SELECT S.fullname AS fullname, coursename, deptcode, designation FROM takes T NATURAL JOIN students NATURAL JOIN courses NATURAL JOIN staff S WHERE studentid=$1 AND T.sem=$2", [rollno, sem]);
    // res.status(200).json({ data: response.data, success: true });
    res.status(200).json({message: "okay"});
  } catch (error) {
    next(error);
  }
}
