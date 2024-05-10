import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

CourseTab.propTypes = {
  course: PropTypes.object,
  onBack: PropTypes.func,
};
function CourseTab({ course, onBack }) {
  return (
    <article className="flex flex-col relative items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <button
        className="text-xl lg:text-2xl absolute  left-2 lg:left-5 top-1 lg:top-auto"
        type="button"
        onClick={onBack}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <div className="flex flex-col justify-center my-auto items-center gap-2 bg-gray-200  text-center p-4 rounded-md">
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Course Name: </span>
          {course.coursename}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Course ID: </span>
          {course.courseid}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Credits: </span>
          {course.credits}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Department: </span>
          {course.deptname}
        </p>
      </div>
    </article>
  );
}

export default CourseTab;
