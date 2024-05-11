import { useEffect, useState } from "react";
import TakesList from "./TakesList";
import axios from "axios";
import Spinner from "../../Spinner";
import { useSelector } from "react-redux";
import TakesNew from "./TakesNew";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DialogBox from "../../DialogBox";
import TakesEdit from "./TakesEdit";
import TakesTab from "./TakesTab";
import { extractUniqueDepartments } from "../../../constants/utils";

const { VITE_BASE_URL } = import.meta.env;
function Takes() {
  const [selectedId, setSelectedId] = useState(null);
  const [takess, setTakess] = useState([]);
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
  const departments = extractUniqueDepartments(takess);
  const takes = takess.find((takes) =>
    selectedId
      ? takes.staffid === Number(selectedId.staffid) &&
        takes.courseid === selectedId.courseid &&
        takes.rollno === Number(selectedId.rollno) &&
        takes.sem === Number(selectedId.sem) &&
        takes.year === Number(takes.year)
      : false
  );

  const sortedTakess =
    sortBy === "all"
      ? takess
      : takess.filter((takes) => takes.deptcode === Number(sortBy));

  const searchedTakess =
    searchQuery.length > 0
      ? sortedTakess.filter((takes) =>
          `${takes.staffid} ${takes.studentname} ${takes.courseid} ${takes.coursename} ${takes.rollno} ${takes.staffname} ${takes.year}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : sortedTakess;

  function onAdd() {
    setMode("new");
  }

  function onBack() {
    setMode("list");
    setSelectedId(null);
  }

  function handleClick(data) {
    setMode("view");
    setSelectedId(data);
  }

  async function handleAdd(data) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_BASE_URL}/admin/takes/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
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
      message: "Are you sure you want to delete this takes?",
      isVisible: true,
    }));
  }

  async function handleDelete(res) {
    if (res) {
      try {
        const id = JSON.stringify(selectedId);
        setIsLoading(true);
        const response = await axios.delete(
          `${VITE_BASE_URL}/admin/takes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
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
    try {
      setIsLoading(true);
      const id = JSON.stringify(selectedId);
      const response = await axios.put(
        `${VITE_BASE_URL}/admin/takes/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
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
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchTakess() {
        try {
          setIsLoading(true);
          const response = await axios.get(`${VITE_BASE_URL}/admin/takes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          if (response.data.success) {
            setTakess(response.data.data);
            console.log("Fetching Success");
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
      if (mode === "list" && selectedId === null) fetchTakess();
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
        Takes
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
        <TakesList
          takess={searchedTakess}
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
        <TakesNew onBack={onBack} onSubmit={handleAdd} />
      )}
      {!isLoading && mode === "view" && (
        <TakesTab onBack={onBack} takes={takes} />
      )}
      {!isLoading && mode === "update" && (
        <TakesEdit onBack={onBack} takes={takes} onSubmit={handleEdit} />
      )}
      {dialog.isVisible && (
        <DialogBox message={dialog.message} onDialog={handleDelete} />
      )}
    </main>
  );
}

export default Takes;
