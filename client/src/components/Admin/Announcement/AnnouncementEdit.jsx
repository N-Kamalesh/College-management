import { useState } from "react";
import PropTypes from "prop-types";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

AnnouncementEdit.propTypes = {
  onSubmit: PropTypes.func,
  announcement: PropTypes.object,
  onBack: PropTypes.func,
};
function AnnouncementEdit({ onSubmit, announcement, onBack }) {
  const [data, setData] = useState(() => ({
    title: announcement.title,
    content: announcement.content,
    deptcode: String(announcement.deptcode),
  }));
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
        className="bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-800 cursor-pointer text-sm md:text-lg rounded-md text-white px-4 py-2 "
        disabled={
          !data.title.trim() ||
          !data.content.trim() ||
          !String(data.deptcode).trim()
        }
      >
        Modify Announcement
      </button>
    </form>
  );
}

export default AnnouncementEdit;
