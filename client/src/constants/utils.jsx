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
