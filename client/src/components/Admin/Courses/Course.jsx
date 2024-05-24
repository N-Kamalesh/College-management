import { useEffect, useState } from "react";
import CourseList from "./CourseList";
import axios from "axios";
import Spinner from "../../Spinner";
import { useSelector } from "react-redux";
import CourseNew from "./CourseNew";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DialogBox from "../../DialogBox";
import CourseEdit from "./CourseEdit";
import CourseTab from "./CourseTab";
import { extractUniqueDepartments } from "../../../constants/utils";

const { VITE_BASE_URL } = import.meta.env;
function Course() {
  const [selectedId, setSelectedId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("list");
  const [sortBy, setSortBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useSelector((state) => state.user);
  const [dialog, setDialog] = useState({
    message: "",
    isVisible: false,
  });
  const course = courses.find((course) =>
    selectedId ? course.courseid === selectedId : false
  );
  const departments = extractUniqueDepartments(courses);

  const sortedCourses =
    sortBy === "all"
      ? courses
      : courses.filter((course) => course.deptcode === Number(sortBy));

  const searchedCourses =
    searchQuery.length > 0
      ? sortedCourses.filter((course) =>
          `${course.courseid} ${course.coursename}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : sortedCourses;

  function onAdd() {
    setMode("new");
  }

  function onBack() {
    setMode("list");
    setSelectedId(null);
  }

  function handleClick(id) {
    setMode("view");
    setSelectedId(id);
  }

  async function handleAdd(data) {
    setError("");
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_BASE_URL}/admin/course/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        setMode("list");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message)
        setError(error?.response?.data?.message);
      else setError("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDeleteClick(id) {
    setSelectedId(id);
    setDialog((dialog) => ({
      ...dialog,
      message: "Are you sure you want to delete this course?",
      isVisible: true,
    }));
  }

  async function handleDelete(res) {
    if (res) {
      setError("");
      try {
        setIsLoading(true);
        const response = await axios.delete(
          `${VITE_BASE_URL}/admin/course/${selectedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          console.log(response.data.message);
          setMode("list");
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message)
          setError(error?.response?.data?.message);
        else setError("Something went wrong! Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    setSelectedId(null);
    setDialog((dialog) => ({ ...dialog, message: "", isVisible: false }));
  }

  function handleEditClick(id) {
    setSelectedId(id);
    setMode("update");
  }

  async function handleEdit(data) {
    setError("");
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${VITE_BASE_URL}/admin/course/${selectedId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        setMode("list");
        setSelectedId(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message)
        setError(error?.response?.data?.message);
      else setError("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      async function fetchCourses() {
        try {
          setIsLoading(true);
          const response = await axios.get(`${VITE_BASE_URL}/admin/course`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setCourses(response.data.data);
          } else {
            setError(response.data.message);
          }
        } catch (error) {
          console.log(error);
          if (error?.response?.data?.message)
            setError(error?.response?.data?.message);
          else setError("Something went wrong! Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
      if (mode === "list" && selectedId === null) fetchCourses();
    },
    [token, mode, selectedId]
  );

  useEffect(
    function () {
      setTimeout(() => {
        setError("");
      }, 10000);
    },
    [error]
  );

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center">
      <h1 className="text-lg md:text-2xl text-indigo-800 font-bold  py-4">
        Courses
      </h1>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{
              scale: 0,
            }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              scale: 0,
            }}
            className="bg-red-500 font-sans text-white rounded-xl p-4 max-w-lg w-[90%] mx-auto mb-2"
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: "white" }}
            />{" "}
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {isLoading && <Spinner />}
      {!isLoading && mode === "list" && (
        <CourseList
          courses={searchedCourses}
          onAdd={onAdd}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleClick={handleClick}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          departments={departments}
        />
      )}
      {!isLoading && mode === "new" && (
        <CourseNew onBack={onBack} onSubmit={handleAdd} />
      )}
      {!isLoading && mode === "view" && (
        <CourseTab onBack={onBack} course={course} />
      )}
      {!isLoading && mode === "update" && (
        <CourseEdit onBack={onBack} course={course} onSubmit={handleEdit} />
      )}
      {dialog.isVisible && (
        <DialogBox message={dialog.message} onDialog={handleDelete} />
      )}
    </main>
  );
}

export default Course;
