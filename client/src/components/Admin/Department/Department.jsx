import { useEffect, useState } from "react";
import DepartmentList from "./DepartmentList";
import axios from "axios";
import Spinner from "../../Spinner";
import { useSelector } from "react-redux";
import DepartmentNew from "./DepartmentNew";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DepartmentEdit from "./DepartmentEdit";
import DepartmentTab from "./DepartmentTab";

const { VITE_BASE_URL } = import.meta.env;
function Department() {
  const [selectedId, setSelectedId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("list");
  const { token } = useSelector((state) => state.user);

  const department = departments.find((department) =>
    selectedId ? department.deptcode === selectedId : false
  );

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
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_BASE_URL}/admin/department/add`,
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

  function handleEditClick(id) {
    setSelectedId(id);
    setMode("update");
  }

  async function handleEdit(data) {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${VITE_BASE_URL}/admin/department/${selectedId}`,
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
      async function fetchDepartments() {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${VITE_BASE_URL}/admin/department`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          if (response.data.success) {
            setDepartments(response.data.data);
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
      if (mode === "list" && selectedId === null) fetchDepartments();
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
        Departments
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
        <DepartmentList
          departments={departments}
          onAdd={onAdd}
          handleEditClick={handleEditClick}
          handleClick={handleClick}
        />
      )}
      {!isLoading && mode === "new" && (
        <DepartmentNew onBack={onBack} onSubmit={handleAdd} />
      )}
      {!isLoading && mode === "view" && (
        <DepartmentTab onBack={onBack} department={department} />
      )}
      {!isLoading && mode === "update" && (
        <DepartmentEdit
          onBack={onBack}
          department={department}
          onSubmit={handleEdit}
        />
      )}
    </main>
  );
}

export default Department;
