import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

TakesTab.propTypes = {
  takes: PropTypes.object,
  onBack: PropTypes.func,
};
function TakesTab({ takes, onBack }) {
  return (
    <article className="flex flex-col relative items-center gap-4 overflow-y-auto h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <button
        className="text-xl lg:text-2xl absolute  left-2 lg:left-5 top-1 lg:top-auto"
        type="button"
        onClick={onBack}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <div className="flex flex-col justify-center my-auto  gap-2 bg-gray-200  text-left p-8 rounded-md">
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Student Name: </span>
          {takes.studentname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Roll Number: </span>
          {takes.rollno}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Staff Name: </span>
          {takes.staffname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Staff ID: </span>
          {takes.staffid}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Course name: </span>
          {takes.coursename}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Course ID: </span>
          {takes.courseid}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Sem: </span>
          {takes.sem}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Year: </span>
          {takes.year}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Department: </span>
          {takes.deptname}
        </p>
      </div>
    </article>
  );
}

export default TakesTab;
