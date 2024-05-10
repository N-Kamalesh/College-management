import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { dateOptions } from "../../../constants/utils";

StudentTab.propTypes = {
  student: PropTypes.object,
  onBack: PropTypes.func,
};
function StudentTab({ student, onBack }) {
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
          {student.fullname}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Roll number: </span>
          {student.rollno}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Gender: </span>
          {student.gender === "M" ? "Male" : "Female"}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Date of birth: </span>
          {new Date(student.dob).toLocaleDateString("en-US", dateOptions)}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Mobile: </span>
          {student.mobile}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Email: </span>
          {student.email}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Semester: </span>
          {student.sem}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Joining Year: </span>
          {student.joinyear}
        </p>
        <p className=" text-md md:text-lg">
          <span className="text-indigo-900 font-semibold">Department: </span>
          {student.deptname}
        </p>
      </div>
    </article>
  );
}

export default StudentTab;
