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
  // timeZone: "Asia/Kolkata",
};

export function getDepartment(deptcode) {
  let department;
  switch (deptcode) {
    case 101:
      department = "Mechanical Engineering";
      break;
    case 102:
      department = "Information Technology";
      break;
    case 103:
      department = "Computer Science and Engineering";
      break;
    case 104:
      department = "Electrical and Electronics Engineering";
      break;
    case 105:
      department = "Electronics and Communication Engineering";
      break;
    case 106:
      department = "Civil Engineering";
      break;
    default:
      department = "Unknown";
  }
  return department;
}
