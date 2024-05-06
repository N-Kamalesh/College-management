import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

SidebarItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  path: PropTypes.string,
  isExpanded: PropTypes.bool,
};
function SidebarItem({ icon, text, path, isExpanded }) {
  return (
    <li className="rounded-md group relative">
      <NavLink
        to={path}
        className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors "
      >
        <span className="w-4 text-center mx-auto">{icon}</span>
        <span
          className={` overflow-hidden transition-all ${
            isExpanded ? "w-56 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </NavLink>
      {!isExpanded && (
        <div
          className={`absolute left-full top-2 rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default SidebarItem;
