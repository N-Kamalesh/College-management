import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { dateOptions } from "../../../constants/utils";

TeachesTab.propTypes = {
  teaches: PropTypes.object,
  onBack: PropTypes.func,
};
function TeachesTab({ teaches, onBack }) {
  return (
    <article className="flex flex-col relative items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <button
        className="text-xl lg:text-2xl absolute  left-2 lg:left-5 top-1 lg:top-auto"
        type="button"
        onClick={onBack}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <div className="flex flex-col justify-center my-auto  gap-2 bg-gray-200  text-left p-8 rounded-md">
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Name: </span>
          {teaches.fullname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Teaches ID: </span>
          {teaches.teachesid}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Gender: </span>
          {teaches.gender === "M" ? "Male" : "Female"}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Mobile: </span>
          {teaches.mobile}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Email: </span>
          {teaches.email}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">
            Highest qualification:{" "}
          </span>
          {teaches.highest_qualification}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Designation: </span>
          {teaches.designation}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Department: </span>
          {teaches.deptname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">
            Date of Joining:{" "}
          </span>
          {new Date(teaches.joindate).toLocaleDateString("en-US", dateOptions)}
        </p>
      </div>
    </article>
  );
}

export default TeachesTab;
