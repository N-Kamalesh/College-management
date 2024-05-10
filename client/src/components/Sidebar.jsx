import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faEllipsisVertical,
  faGraduationCap,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import staff from "../assets/staff.png";
import student from "../assets/student.png";
import admin from "../assets/admin.png";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_SIDEBAR_ITEMS } from "../constants/sidebar";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { role, user } = useSelector((state) => state.user);
  const src = role === "student" ? student : role === "staff" ? staff : admin;
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      setError("Coudn't Logout");
      console.log(error);
    }
  }

  useEffect(
    function () {
      setTimeout(() => {
        setError("");
      }, 10000);
    },
    [error]
  );

  return (
    <aside className="min-h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 mb-2 flex justify-between items-center  bg-gray-50 text-indigo-800">
          <h1
            className={`font-bold overflow-hidden transition-all ${
              isExpanded ? "inline" : "hidden"
            }`}
          >
            <Link to="/">
              <FontAwesomeIcon icon={faGraduationCap} />{" "}
              <span
                className={`${
                  isExpanded ? "inline" : "hidden"
                } transition-all `}
              >
                College DB
              </span>
            </Link>
          </h1>
          <FontAwesomeIcon
            className="block md:hidden mx-auto"
            icon={faGraduationCap}
          />
          <button
            className={`${isExpanded ? "" : "mx-auto"} text-xl hidden md:block`}
            onClick={() => setIsExpanded((curr) => !curr)}
          >
            <FontAwesomeIcon
              icon={isExpanded ? faCircleChevronLeft : faCircleChevronRight}
            />
          </button>
        </div>
        <ul className="flex-1 px-3">
          {ADMIN_SIDEBAR_ITEMS.map((item, index) => (
            <SidebarItem
              icon={item.icon}
              text={item.text}
              key={index}
              path={item.path}
              isExpanded={isExpanded}
            />
          ))}
        </ul>
        <div className="w-full">
          <div
            className={`flex justify-evenly items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer text-gray-600 transition-colors hover:bg-red-600 hover:text-white`}
            onClick={handleLogout}
          >
            <span className={`w-4 text-center ${isExpanded ? "" : "mx-auto"}`}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span
              className={` overflow-hidden transition-all ${
                isExpanded ? "w-52 " : "w-0"
              }`}
            >
              Logout
            </span>
          </div>
          <div className="relative border-t group flex p-3">
            <img
              className={`size-10 rounded-full border-2 border-indigo-800`}
              src={src}
              alt={`${role}`}
            />
            <div
              className={`flex justify-between items-center ml-3 overflow-hidden transition-all ${
                isExpanded ? "w-56" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-indigo-800"> {role === "admin" ? user.name : role === "staff" ? user.staffid : user.rollno}</h4>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
            {!isExpanded && (
              <div
                className={`absolute left-full top-4 rounded-md px-2 py-1 ml-2 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
              >
                {role === "admin" ? user.name : role === "staff" ? user.staffid : user.rollno}
              </div>
            )}
            {error && (
              <div
                className={`absolute left-full bottom-20 rounded-md px-2 py-1 ml-2 bg-red-600 text-white text-sm w-full`}
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
