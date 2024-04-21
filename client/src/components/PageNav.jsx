import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

function PageNav() {
  return (
    <header className="bg-white/[0.2] backdrop-blur-md">
      <nav className="flex justify-between items-center max-w-6xl mx-auto p-4 text-white">
        <h1 className="font-bold ">
          <Link to="/">
            <FontAwesomeIcon icon={faGraduationCap} /> College DB
          </Link>
        </h1>
        <ul className="flex gap-4 sm:gap-8">
          <NavLink to="/student">
            <li>Student</li>
          </NavLink>
          <NavLink to="/staff">
            <li>Staff</li>
          </NavLink>
          <NavLink to="/contact">
            <li>Contact</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default PageNav;
