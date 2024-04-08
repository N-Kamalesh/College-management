import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <header className="bg-white/[0.2] backdrop-blur-md">
      <nav className="flex justify-between items-center max-w-6xl mx-auto p-4 text-white">
        <h1 className="font-bold">College DB</h1>
        <ul className="flex gap-4 sm:gap-8">
          <NavLink to="/student/signup">
            <li>Student</li>
          </NavLink>
          <NavLink to="/staff/signin">
            <li>Staff</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default PageNav;
