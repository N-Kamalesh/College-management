import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { dateOptions } from "../../../constants/utils";

AnnouncementItem.propTypes = {
  announcement: PropTypes.object,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleClick: PropTypes.func,
};
function AnnouncementItem({
  announcement,
  handleDeleteClick,
  handleEditClick,
  handleClick,
}) {
  return (
    <div className="rounded-md border-2 bg-gray-200 p-4 w-4/5 flex flex-col md:flex-row justify-between items-center">
      <div
        className="w-full text-center md:text-left cursor-pointer"
        onClick={() => handleClick(announcement.announcement_id)}
      >
        <h1 className="text-sm md:text-xl font-semibold">
          {announcement.title.substring(0, 30)}
          {announcement.title.length > 30 ? "..." : ""}
        </h1>
        <p className="text-xs md:text-lg">
          {announcement.content.substring(0, 50) + "..."}
        </p>
        <span className="text-[10px] md:text-[15px]">
          {new Date(announcement.created_at).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </span>
      </div>
      <div className="w-full md:w-auto flex gap-8 mt-2 md:mt-0 justify-evenly text-md md:text-lg md:justify-between">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeleteClick(announcement.announcement_id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEditClick(announcement.announcement_id)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    </div>
  );
}

export default AnnouncementItem;
