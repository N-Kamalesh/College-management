import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

DepartmentItem.propTypes = {
  department: PropTypes.object,
  handleEditClick: PropTypes.func,
  handleClick: PropTypes.func,
};
function DepartmentItem({ department, handleEditClick, handleClick }) {
  return (
    <div className="rounded-md border-2 bg-gray-200 p-4 w-4/5 flex flex-col md:flex-row justify-between items-center">
      <div
        className="w-full text-center md:text-left cursor-pointer"
        onClick={() => handleClick(department.deptcode)}
      >
        <h1 className="text-sm md:text-xl font-semibold">
          {department.deptname}
        </h1>
        <p className="text-xs md:text-lg">
          Department code: {department.deptcode}
        </p>
      </div>
      <div className="w-full md:w-auto text-center md:mt-0  text-md md:text-lg">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEditClick(department.deptcode)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    </div>
  );
}

export default DepartmentItem;
