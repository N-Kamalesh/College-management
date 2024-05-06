import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { getDepartment, timeOptions } from "../../../constants/utils";

AnnouncementTab.propTypes = {
  announcement: PropTypes.object,
  onBack: PropTypes.func,
};
function AnnouncementTab({ announcement, onBack }) {
  return (
    <article className="flex flex-col relative items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <button
        className="text-xl lg:text-2xl absolute  left-2 lg:left-5 top-1 lg:top-auto"
        type="button"
        onClick={onBack}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <h2 className="mt-6 lg:mt-0 text-lg md:text-2xl text-indigo-900 font-semibold text-center">
        {announcement.title}
      </h2>
      <h3 className="text-center text-md md:text-xl p-2 bg-gray-100 rounded-md ">
        {getDepartment(announcement.deptcode)}
      </h3>
      <p className="whitespace-pre-wrap text-sm md:text-lg text-justify bg-gray-200  p-2 lg:p-4 rounded-md">
        {announcement.content}
      </p>
      <p className="flex text-xs items-center gap-4 md:text-sm flex-col w-full md:justify-around md:flex-row text-center ">
        <span className="p-2 bg-gray-100 rounded-md ">
          Created time:
          <br />
          {new Date(announcement.created_at).toLocaleDateString(
            "en-US",
            timeOptions
          )}
        </span>
        <span className="p-2 bg-gray-100 rounded-md ">
          Last Updated:
          <br />
          {new Date(announcement.updated_at).toLocaleDateString(
            "en-US",
            timeOptions
          )}
        </span>
      </p>
    </article>
  );
}

export default AnnouncementTab;
