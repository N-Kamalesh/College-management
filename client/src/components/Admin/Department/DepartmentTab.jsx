import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

DepartmentTab.propTypes = {
  department: PropTypes.object,
  onBack: PropTypes.func,
};
function DepartmentTab({ department, onBack }) {
  return (
    <article className="flex flex-col relative items-center gap-4 overflow-y-auto h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <button
        className="text-xl lg:text-2xl absolute  left-2 lg:left-5 top-1 lg:top-auto"
        type="button"
        onClick={onBack}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <h2 className="mt-6 lg:mt-0 text-lg md:text-2xl text-indigo-900 font-semibold text-center">
        {department.deptname}
      </h2>
      <h3 className="text-center text-md md:text-xl p-2 bg-gray-100 rounded-md ">
        Department Code: {department.deptcode}
      </h3>
      <h4 className="text-md md:text-xl">HOD info:</h4>
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200  text-center p-4 rounded-md">
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Name: </span>
          {department.fullname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Staff ID: </span>{" "}
          {department.hod_id}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Qualification: </span>
          {department.highest_qualification}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Mobile: </span>
          {department.mobile}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Email: </span>
          {department.email}
        </p>
      </div>
    </article>
  );
}

export default DepartmentTab;
