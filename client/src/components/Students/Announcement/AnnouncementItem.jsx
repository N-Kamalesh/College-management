import PropTypes from "prop-types";
import { dateOptions } from "../../../constants/utils";

AnnouncementItem.propTypes = {
  announcement: PropTypes.object,
  handleClick: PropTypes.func,
};
function AnnouncementItem({ announcement, handleClick }) {
  return (
    <div className="rounded-md border-2 bg-gray-200 p-4 w-4/5 flex flex-col md:flex-row justify-between items-center hover:scale-105 transition-all">
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
    </div>
  );
}

export default AnnouncementItem;
