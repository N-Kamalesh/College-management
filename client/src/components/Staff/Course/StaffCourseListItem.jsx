import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

StaffCourseListItem.propTypes = {
  rollno: PropTypes.number,
  courseid: PropTypes.string,
  sem: PropTypes.number,
  year: PropTypes.number,
  coursename: PropTypes.string,
  fullname: PropTypes.string,
  deptcode: PropTypes.number,
};
function StaffCourseListItem({
  rollno,
  courseid,
  sem,
  year,
  coursename,
  fullname,
  deptcode,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  async function handleLiClick() {
    const data = {
      rollno: rollno,
      courseid: courseid,
      sem: sem,
      year: year,
      coursename: coursename,
      fullname: fullname,
    };
    navigate(location.pathname + "/student", { state: data });
  }
  return (
    <li
      onClick={() => handleLiClick()}
      className="staff-course-li bg-indigo-800 text-white cursor-pointer w-4/5 rounded-lg m-2 p-1 grid grid-rows-12 grid-cols-4 lg:grid-cols-12 lg:grid-rows-8 h-full"
    >
      <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-4 px-3 font-bold">
        Roll No
      </div>
      <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-8 px-3">
        {rollno}
      </div>
      <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-4 px-3 font-bold">
        Name
      </div>
      <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-8 px-3">
        {fullname}
      </div>
      <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-4 px-3 font-bold">
        Dept.
      </div>
      <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-8 px-3">
        {deptcode}
      </div>
      <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-4 px-3 font-bold">
        Course
      </div>
      <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-8 px-3">
        {coursename}
      </div>
    </li>
  );
}

export default StaffCourseListItem;
