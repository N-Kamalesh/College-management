import { useState } from "react";
import PropTypes from "prop-types";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

CourseEdit.propTypes = {
  onSubmit: PropTypes.func,
  course: PropTypes.object,
  onBack: PropTypes.func,
};
function CourseEdit({ onSubmit, course, onBack }) {
  const [data, setData] = useState(() => ({
    courseid: course.courseid,
    coursename: course.coursename,
    credits: course.credits,
    deptcode: course.deptcode,
  }));
  function handleChange(e) {
    const { name, value } = e.target;
    setData((curr) => ({ ...curr, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setData((data) => ({ ...data, credits: Number(data.credits) }));
    onSubmit(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex relative flex-col items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800"
    >
      <button
        className="text-xl lg:text-2xl absolute  left-2 lg:left-5 top-1 lg:top-auto"
        type="button"
        onClick={onBack}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <input
        className="border-2 mt-6 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the course id"
        type="text"
        name="courseid"
        value={data.courseid}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-6 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the course name"
        type="text"
        name="coursename"
        value={data.coursename}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-6 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the course credits"
        type="text"
        name="credits"
        value={data.credits}
        autoComplete="off"
        onChange={handleChange}
      />

      <input
        className="border-2 mt-6 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the department code"
        type="text"
        name="deptcode"
        value={data.deptcode}
        autoComplete="off"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-800  text-sm md:text-lg cursor-pointer rounded-md text-white px-4 py-2 "
        disabled={
          !String(data.deptcode).trim() ||
          !String(data.credits).trim() ||
          !data.courseid.trim() ||
          !data.coursename.trim()
        }
      >
        Modify Course
      </button>
    </form>
  );
}

export default CourseEdit;
