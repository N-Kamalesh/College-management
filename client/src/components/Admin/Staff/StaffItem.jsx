import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

StaffItem.propTypes = {
  staff: PropTypes.object,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleClick: PropTypes.func,
};
function StaffItem({ staff, handleDeleteClick, handleEditClick, handleClick }) {
  return (
    <div className="rounded-md border-2 bg-gray-200 p-4 w-4/5 flex flex-col md:flex-row justify-between items-center">
      <div
        className="w-full text-center md:text-left cursor-pointer"
        onClick={() => handleClick(staff.staffid)}
      >
        <h1 className="text-sm md:text-xl font-semibold">{staff.fullname}</h1>
        <p className="text-xs md:text-lg">Staff ID: {staff.staffid}</p>
        <p className="text-[10px] md:text-[15px]">{staff.designation}</p>
      </div>
      <div className="w-full md:w-auto flex gap-8 mt-2 md:mt-0 justify-evenly text-md md:text-lg md:justify-between">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeleteClick(staff.staffid)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEditClick(staff.staffid)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    </div>
  );
}

export default StaffItem;
