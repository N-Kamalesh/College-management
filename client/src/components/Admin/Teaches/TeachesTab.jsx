import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

TeachesTab.propTypes = {
  teaches: PropTypes.object,
  onBack: PropTypes.func,
};
function TeachesTab({ teaches, onBack }) {
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
          <span className="text-indigo-900 font-semibold">Staff Name: </span>
          {teaches.fullname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Staff ID: </span>
          {teaches.staffid}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Course name: </span>
          {teaches.coursename}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Course ID: </span>
          {teaches.courseid}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Sem: </span>
          {teaches.sem}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Year: </span>
          {teaches.year}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Department: </span>
          {teaches.deptname}
        </p>
      </div>
    </article>
  );
}

export default TeachesTab;
