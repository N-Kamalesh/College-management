import { useEffect, useState } from "react";
import AnnouncementList from "./AnnouncementList";
import axios from "axios";
import Spinner from "../../Spinner";
import { useSelector } from "react-redux";
import AnnouncementNew from "./AnnouncementNew";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DialogBox from "../../DialogBox";
import AnnouncementEdit from "./AnnouncementEdit";
import AnnouncementTab from "./AnnouncementTab";

const { VITE_BASE_URL } = import.meta.env;
function Announcement() {
  const [selectedId, setSelectedId] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [sortedAnnouncements, setSortedAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("list");
  const [sortBy, setSortBy] = useState("newcreated");
  const [searchQuery, setSearchQuery] = useState("");
  const { user, token } = useSelector((state) => state.user);
  const [dialog, setDialog] = useState({
    message: "",
    isVisible: false,
  });

  const announcement = announcements.find((announcement) =>
    selectedId ? announcement.announcement_id === selectedId : false
  );

  const searchedAnnouncements =
    searchQuery.length > 0
      ? sortedAnnouncements.filter((announcement) =>
          `${announcement.title} ${announcement.content}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : sortedAnnouncements;

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
    const formData = { ...data, deptcode: user.deptcode };
    setError("");
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_BASE_URL}/staff/announcement/add`,
        formData,
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
      message: "Are you sure you want to delete this announcement?",
      isVisible: true,
    }));
  }

  async function handleDelete(res) {
    if (res) {
      setError("");
      try {
        setIsLoading(true);
        const response = await axios.delete(
          `${VITE_BASE_URL}/staff/announcement/${selectedId}`,
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
    const formData = { ...data, deptcode: user.deptcode };
    setError("");
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${VITE_BASE_URL}/staff/announcement/${selectedId}`,
        formData,
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
      async function fetchAnnouncements() {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${VITE_BASE_URL}/staff/announcement/${user.deptcode}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setAnnouncements(response.data.data);
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
      if (mode === "list" && selectedId === null) fetchAnnouncements();
    },
    [token, mode, selectedId, user.deptcode]
  );

  useEffect(
    function () {
      setTimeout(() => {
        setError("");
      }, 10000);
    },
    [error]
  );

  useEffect(
    function () {
      let sortedAnnouncements;
      switch (sortBy) {
        case "newcreated":
          sortedAnnouncements = [...announcements].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
          });
          break;
        case "oldcreated":
          sortedAnnouncements = [...announcements].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateA - dateB;
          });
          break;
        case "lastupdated":
          sortedAnnouncements = [...announcements].sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            return dateB - dateA;
          });
          break;
        default:
          sortedAnnouncements = [...announcements];
      }
      setSortedAnnouncements(sortedAnnouncements);
    },
    [sortBy, announcements]
  );

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center">
      <h1 className="text-lg md:text-2xl text-indigo-800 font-bold  py-4">
        Announcements
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
        <AnnouncementList
          announcements={searchedAnnouncements}
          onAdd={onAdd}
          sortBy={sortBy}
          searchQuery={searchQuery}
          setSortBy={setSortBy}
          setSearchQuery={setSearchQuery}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleClick={handleClick}
        />
      )}
      {!isLoading && mode === "new" && (
        <AnnouncementNew onBack={onBack} onSubmit={handleAdd} />
      )}
      {!isLoading && mode === "view" && (
        <AnnouncementTab onBack={onBack} announcement={announcement} />
      )}
      {!isLoading && mode === "update" && (
        <AnnouncementEdit
          onBack={onBack}
          announcement={announcement}
          onSubmit={handleEdit}
        />
      )}
      {dialog.isVisible && (
        <DialogBox message={dialog.message} onDialog={handleDelete} />
      )}
    </main>
  );
}

export default Announcement;
