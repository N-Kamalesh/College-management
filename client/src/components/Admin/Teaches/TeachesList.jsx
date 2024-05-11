import PropTypes from "prop-types";
import TeachesItem from "./TeachesItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

TeachesList.propTypes = {
  teachess: PropTypes.array,
  onAdd: PropTypes.func,
  sortBy: PropTypes.string,
  searchQuery: PropTypes.string,
  setSortBy: PropTypes.func,
  setSearchQuery: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  departments: PropTypes.array,
  handleClick: PropTypes.func,
};

function TeachesList({
  teachess,
  onAdd,
  sortBy,
  searchQuery,
  setSortBy,
  setSearchQuery,
  handleDeleteClick,
  handleEditClick,
  handleClick,
  departments,
}) {
  return (
    <section className="flex flex-col items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800">
      <button
        onClick={onAdd}
        className="bg-indigo-600 text-xs sm:text-sm md:text-lg hover:bg-indigo-800  rounded-md text-white px-4 py-2 "
      >
        <FontAwesomeIcon icon={faCirclePlus} />
        <span className="ml-2">Add new teaches</span>
      </button>
      <section className="flex flex-col md:flex-row w-[90%] md:justify-evenly">
        <input
          className="border-2  border-indigo-200  max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none w-full md:w-2/5"
          placeholder="Search by teaches & course id or name"
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
          <option value="all">All Departments</option>
          {departments.map((department) => (
            <option key={department[0]} value={department[0]}>
              {department[1]}
            </option>
          ))}
        </select>
      </section>
      {teachess.length === 0 ? (
        <p className="text-center">
          None of the staffs have teached any course yet
        </p>
      ) : (
        teachess.map((teaches, index) => (
          <TeachesItem
            teaches={teaches}
            key={index}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            handleClick={handleClick}
          />
        ))
      )}
    </section>
  );
}

export default TeachesList;
