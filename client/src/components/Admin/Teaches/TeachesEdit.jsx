import { useState } from "react";
import PropTypes from "prop-types";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SID_REGEX = /^2[\d]{3}$/;

TeachesEdit.propTypes = {
  onSubmit: PropTypes.func,
  teaches: PropTypes.object,
  onBack: PropTypes.func,
};

function TeachesEdit({ onSubmit, teaches, onBack }) {
  const [data, setData] = useState({
    staffid: String(teaches.staffid),
    courseid: teaches.courseid,
    deptcode: String(teaches.deptcode),
    sem: String(teaches.sem),
    year: String(teaches.year),
  });

  const validSem = data.sem
    ? Number(data.sem) >= 1 && Number(data.sem) <= 8
    : false;
  const validSId = SID_REGEX.test(data.staffid);
  const validYear =
    Number(data.year) > 2000 && Number(data.year) <= new Date().getFullYear();

  function handleChange(e) {
    const { name, value } = e.target;
    setData((curr) => ({ ...curr, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800"
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
        placeholder="Enter the staff id"
        type="text"
        name="staffid"
        value={data.staffid}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the course id"
        type="text"
        name="courseid"
        value={data.courseid}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the department code"
        type="text"
        name="deptcode"
        value={data.deptcode}
        autoComplete="off"
        onChange={handleChange}
      />

      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the semester"
        type="text"
        name="sem"
        value={data.sem}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the year"
        type="text"
        name="year"
        value={data.year}
        autoComplete="off"
        onChange={handleChange}
      />
      <button
        className="bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-800 cursor-pointer text-sm md:text-lg rounded-md text-white px-4 py-2 "
        disabled={
          !data.courseid.trim() ||
          !validSId ||
          !validSem ||
          !validYear ||
          !String(data.deptcode).trim()
        }
      >
        Modify Teaches
      </button>
    </form>
  );
}

export default TeachesEdit;
