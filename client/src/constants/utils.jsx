export const dateOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
};

export const timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
};

export function extractUniqueDepartments(students) {
  const uniqueDepartmentsMap = new Map();

  students.forEach((student) => {
    uniqueDepartmentsMap.set(student.deptcode, student.deptname);
  });

  const uniqueDepartmentsArray = Array.from(uniqueDepartmentsMap).map(
    ([deptcode, deptname]) => [deptcode, deptname]
  );

  return uniqueDepartmentsArray;
}

export function createArray(marks) {
  const semSet = new Set();
  marks.forEach((mark) => semSet.add(mark.sem));
  const sem = [];
  semSet.forEach((sems) => sem.push(sems));
  return sem.sort((a, b) => a - b);
}

export function getCgpa(marks) {
  let totalCredits = 0;
  const isFail = marks.find((mark) => mark.grade === "F");
  if (isFail) return "NA";
  const isSA = marks.find((mark) => mark.grade === "SA");
  if (isSA) return "NA";
  const sortedMarks = marks.filter((mark) => mark.grade !== null);
  let total = 0;
  sortedMarks.forEach((mark) => {
    switch (mark.grade) {
      case "A":
        totalCredits += mark.credits * 10;
        total += mark.credits;
        break;
      case "B":
        totalCredits += mark.credits * 9;
        total += mark.credits;
        break;
      case "C":
        totalCredits += mark.credits * 8;
        total += mark.credits;
        break;
      case "D":
        totalCredits += mark.credits * 7;
        total += mark.credits;
        break;
      case "E":
        totalCredits += mark.credits * 6;
        total += mark.credits;
        break;
      default:
        console.log(mark);
        return "NA";
    }
  });
  const gpa = totalCredits / total;
  return gpa;
}
