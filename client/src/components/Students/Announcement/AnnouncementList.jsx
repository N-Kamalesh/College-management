import PropTypes from "prop-types";
import AnnouncementItem from "./AnnouncementItem";

AnnouncementList.propTypes = {
  announcements: PropTypes.array,
  sortBy: PropTypes.string,
  searchQuery: PropTypes.string,
  setSortBy: PropTypes.func,
  setSearchQuery: PropTypes.func,
  handleClick: PropTypes.func,
};

function AnnouncementList({
  announcements,
  sortBy,
  searchQuery,
  setSortBy,
  setSearchQuery,
  handleClick,
}) {
  return (
    <section className="flex flex-col items-center gap-4 overflow-y-auto h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <section className="flex flex-col md:flex-row w-[90%] md:justify-evenly">
        <input
          className="border-2  border-indigo-200  max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none w-full md:w-2/5"
          placeholder="Search by word"
          type="text"
          name="searchQuery"
          value={searchQuery}
          autoComplete="off"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-center border-2 mt-2 md:mt-0 border-indigo-200 w-full md:w-2/5 max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        >
          <option value="newcreated">Newest announcements</option>
          <option value="oldcreated">Oldest announcements</option>
          <option value="lastupdated">Recently updated</option>
        </select>
      </section>
      {announcements.length === 0 ? (
        <p className="text-center">No announcements are available</p>
      ) : (
        announcements.map((announcement) => (
          <AnnouncementItem
            announcement={announcement}
            key={announcement.announcement_id}
            handleClick={handleClick}
          />
        ))
      )}
    </section>
  );
}

export default AnnouncementList;
