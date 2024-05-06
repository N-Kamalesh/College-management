import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGraduationCap,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function PageNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white/[0.2] backdrop-blur-md flex-wrap from-indigo-200 to-indigo-100 bg-indigo-800">
      <nav className="flex justify-between items-center max-w-6xl mx-auto p-4 text-white">
        <h1 className={`font-bold `}>
          <Link to="/">
            <FontAwesomeIcon icon={faGraduationCap} /> <span>College DB</span>
          </Link>
        </h1>
        <ul className="hidden md:flex gap-4 sm:gap-8">
          <NavLink to="/student">
            <li>Student</li>
          </NavLink>
          <NavLink to="/staff">
            <li>Staff</li>
          </NavLink>
          <NavLink to="/admin">
            <li>Admin</li>
          </NavLink>
          <NavLink to="/contact">
            <li>Contact</li>
          </NavLink>
        </ul>
        <button
          className="block md:hidden "
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </nav>
      {isOpen && (
        <>
          <hr className="block md:hidden bg-white h-[1px] w-full" />

          <ul className="p-4 flex md:hidden w-full h-full text-white gap-2 flex-col animate-open-menu basis-full justify-center items-center">
            <NavLink to="/student">
              <li>Student</li>
            </NavLink>
            <NavLink to="/staff">
              <li>Staff</li>
            </NavLink>
            <NavLink to="/admin">
              <li>Admin</li>
            </NavLink>
            <NavLink to="/contact">
              <li>Contact</li>
            </NavLink>
          </ul>
        </>
      )}
    </header>
  );
}

export default PageNav;
