import { useEffect, useState } from "react";
import StaffList from "./StaffList";
import axios from "axios";
import Spinner from "../../Spinner";
import { useSelector } from "react-redux";
import StaffNew from "./StaffNew";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DialogBox from "../../DialogBox";
import StaffEdit from "./StaffEdit";
import StaffTab from "./StaffTab";
import { extractUniqueDepartments } from "../../../constants/utils";

const { VITE_BASE_URL } = import.meta.env;
function Staff() {
  const [selectedId, setSelectedId] = useState(null);
  const [staffs, setStaffs] = useState([]);
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
  const departments = extractUniqueDepartments(staffs);
  const staff = staffs.find((staff) =>
    selectedId ? staff.staffid === selectedId : false
  );

  const sortedStaffs =
    sortBy === "all"
      ? staffs
      : staffs.filter((staff) => staff.deptcode === Number(sortBy));

  const searchedStaffs =
    searchQuery.length > 0
      ? sortedStaffs.filter((staff) =>
          `${staff.staffid} ${staff.fullname}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : sortedStaffs;

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
        `${VITE_BASE_URL}/admin/staff/add`,
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
      message: "Are you sure you want to delete this staff?",
      isVisible: true,
    }));
  }

  async function handleDelete(res) {
    if (res) {
      try {
        setIsLoading(true);
        const response = await axios.delete(
          `${VITE_BASE_URL}/admin/staff/${selectedId}`,
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
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${VITE_BASE_URL}/admin/staff/${selectedId}`,
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
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchStaffs() {
        try {
          setIsLoading(true);
          const response = await axios.get(`${VITE_BASE_URL}/admin/staff`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setStaffs(response.data.data);
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
      if (mode === "list" && selectedId === null) fetchStaffs();
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
        Staffs
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
        <StaffList
          staffs={searchedStaffs}
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
        <StaffNew onBack={onBack} onSubmit={handleAdd} />
      )}
      {!isLoading && mode === "view" && (
        <StaffTab onBack={onBack} staff={staff} />
      )}
      {!isLoading && mode === "update" && (
        <StaffEdit onBack={onBack} staff={staff} onSubmit={handleEdit} />
      )}
      {dialog.isVisible && (
        <DialogBox message={dialog.message} onDialog={handleDelete} />
      )}
    </main>
  );
}

export default Staff;
