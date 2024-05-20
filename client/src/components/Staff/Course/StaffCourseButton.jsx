import PropTypes from "prop-types";

StaffCourseButton.propTypes = {
  id: PropTypes.string,
  onClickHandler: PropTypes.func,
  text: PropTypes.string,
  selectedCourse: PropTypes.string,
};
function StaffCourseButton({ id, onClickHandler, text, selectedCourse }) {
  return (
    <button
      id={id}
      onClick={(e) => onClickHandler(e)}
      className={`staff-course-button ${
        String(selectedCourse) === String(id)
          ? "bg-indigo-900 border-2 border-indigo-400"
          : "bg-indigo-600"
      } text-white p-2 rounded-xl w-40 h-32 mx-8`}
    >
      {text}
    </button>
  );
}

export default StaffCourseButton;
