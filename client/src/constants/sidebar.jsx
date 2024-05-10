import {
  faBook,
  faBookOpenReader,
  faBuilding,
  faBullhorn,
  faChalkboard,
  faChalkboardUser,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ADMIN_SIDEBAR_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    text: "Students",
    path: "student",
  },
  {
    icon: <FontAwesomeIcon icon={faChalkboardUser} />,
    text: "Staffs",
    path: "staff",
  },
  {
    icon: <FontAwesomeIcon icon={faChalkboard} />,
    text: "Teaches",
    path: "teaches",
  },
  {
    icon: <FontAwesomeIcon icon={faBookOpenReader} />,
    text: "Takes",
    path: "takes",
  },

  { icon: <FontAwesomeIcon icon={faBook} />, text: "Courses", path: "course" },
  {
    icon: <FontAwesomeIcon icon={faBuilding} />,
    text: "Departments",
    path: "department",
  },
  {
    icon: <FontAwesomeIcon icon={faBullhorn} />,
    text: "Announcements",
    path: "announcement",
  },
];
