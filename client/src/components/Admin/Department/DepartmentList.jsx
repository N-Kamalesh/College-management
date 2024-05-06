import PropTypes from "prop-types";
import DepartmentItem from "./DepartmentItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

DepartmentList.propTypes = {
  departments: PropTypes.array,
  onAdd: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleClick: PropTypes.func,
};

function DepartmentList({ departments, onAdd, handleEditClick, handleClick }) {
  return (
    <section className="flex flex-col items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <button
        onClick={onAdd}
        className="bg-indigo-600 text-xs sm:text-sm md:text-lg hover:bg-indigo-800  rounded-md text-white px-4 py-2 "
      >
        <FontAwesomeIcon icon={faCirclePlus} />
        <span className="ml-2">Add new department</span>
      </button>
      {departments.length === 0 ? (
        <p className="text-center">No departments are available</p>
      ) : (
        departments.map((department) => (
          <DepartmentItem
            department={department}
            key={department.deptcode}
            handleEditClick={handleEditClick}
            handleClick={handleClick}
          />
        ))
      )}
    </section>
  );
}

export default DepartmentList;
