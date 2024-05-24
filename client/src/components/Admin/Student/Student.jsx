import { useEffect, useState } from "react";
import StudentList from "./StudentList";
import axios from "axios";
import Spinner from "../../Spinner";
import { useSelector } from "react-redux";
import StudentNew from "./StudentNew";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DialogBox from "../../DialogBox";
import StudentEdit from "./StudentEdit";
import StudentTab from "./StudentTab";
import { extractUniqueDepartments } from "../../../constants/utils";

const { VITE_BASE_URL } = import.meta.env;
function Student() {
  const [selectedId, setSelectedId] = useState(null);
  const [students, setStudents] = useState([]);
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
  const departments = extractUniqueDepartments(students);
  const student = students.find((student) =>
    selectedId ? student.rollno === selectedId : false
  );

  const sortedStudents =
    sortBy === "all"
      ? students
      : students.filter((student) => student.deptcode === Number(sortBy));

  const searchedStudents =
    searchQuery.length > 0
      ? sortedStudents.filter((student) =>
          `${student.rollno} ${student.fullname}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : sortedStudents;

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
        `${VITE_BASE_URL}/admin/student/add`,
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
      message: "Are you sure you want to delete this student?",
      isVisible: true,
    }));
  }

  async function handleDelete(res) {
    if (res) {
      setError("");
      try {
        setIsLoading(true);
        const response = await axios.delete(
          `${VITE_BASE_URL}/admin/student/${selectedId}`,
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
        `${VITE_BASE_URL}/admin/student/${selectedId}`,
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
      async function fetchStudents() {
        try {
          setIsLoading(true);
          const response = await axios.get(`${VITE_BASE_URL}/admin/student`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setStudents(response.data.data);
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
      if (mode === "list" && selectedId === null) fetchStudents();
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
        Students
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
        <StudentList
          students={searchedStudents}
          onAdd={onAdd}
          sortBy={sortBy}
          searchQuery={searchQuery}
          setSortBy={setSortBy}
          setSearchQuery={setSearchQuery}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleClick={handleClick}
          departments={departments}
        />
      )}
      {!isLoading && mode === "new" && (
        <StudentNew onBack={onBack} onSubmit={handleAdd} />
      )}
      {!isLoading && mode === "view" && (
        <StudentTab onBack={onBack} student={student} />
      )}
      {!isLoading && mode === "update" && (
        <StudentEdit onBack={onBack} student={student} onSubmit={handleEdit} />
      )}
      {dialog.isVisible && (
        <DialogBox message={dialog.message} onDialog={handleDelete} />
      )}
    </main>
  );
}

export default Student;
