import { useState } from "react";
import PropTypes from "prop-types";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

AnnouncementNew.propTypes = {
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
};
function AnnouncementNew({ onSubmit, onBack }) {
  const [data, setData] = useState({
    title: "",
    content: "",
    deptcode: "101",
  });
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
        placeholder="Enter the announcement title"
        type="text"
        name="title"
        value={data.title}
        autoComplete="off"
        onChange={handleChange}
      />
      <textarea
        className="border-2 border-indigo-200 w-full min-h-[50vh] max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        type="text"
        name="content"
        placeholder="Enter the announcement content"
        value={data.content}
        autoComplete="off"
        onChange={handleChange}
      />
      <select
        className="text-center border-2 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        name="deptcode"
        value={data.deptcode}
        onChange={handleChange}
      >
        <option value="" className="text-center" disabled>
          ---Department---
        </option>
        <option value="101" className="text-center">
          Mechanical Engineering
        </option>
        <option value="102" className="text-center">
          Information Technology
        </option>
        <option value="103" className="text-center">
          Computer Science and Engineering
        </option>
        <option value="104" className="text-center">
          Electrical and Electronics Engineering
        </option>
        <option value="105" className="text-center">
          Electronics and Communication Engineering
        </option>
        <option value="106" className="text-center">
          Civil Engineering
        </option>
      </select>
      <button
        className="bg-indigo-600  hover:bg-indigo-800  text-sm md:text-lg rounded-md text-white px-4 py-2 "
        disabled={!data.title.trim() || !data.content.trim()}
      >
        Add Announcement
      </button>
    </form>
  );
}

export default AnnouncementNew;
