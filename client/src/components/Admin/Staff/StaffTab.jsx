import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { dateOptions } from "../../../constants/utils";

StaffTab.propTypes = {
  staff: PropTypes.object,
  onBack: PropTypes.func,
};
function StaffTab({ staff, onBack }) {
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
          {staff.fullname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Staff ID: </span>
          {staff.staffid}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Gender: </span>
          {staff.gender === "M" ? "Male" : "Female"}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Mobile: </span>
          {staff.mobile}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Email: </span>
          {staff.email}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">
            Highest qualification:{" "}
          </span>
          {staff.highest_qualification}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Designation: </span>
          {staff.designation}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Department: </span>
          {staff.deptname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">
            Date of Joining:{" "}
          </span>
          {new Date(staff.joindate).toLocaleDateString("en-US", dateOptions)}
        </p>
      </div>
    </article>
  );
}

export default StaffTab;
