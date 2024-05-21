import { useEffect, useState } from "react";
import AnnouncementList from "./AnnouncementList";
import axios from "axios";
import Spinner from "../../Spinner";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
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

  function onBack() {
    setMode("list");
    setSelectedId(null);
  }

  function handleClick(id) {
    setMode("view");
    setSelectedId(id);
  }

  useEffect(
    function () {
      async function fetchAnnouncements() {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${VITE_BASE_URL}/student/announcement/${user.deptcode}`,
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
          sortBy={sortBy}
          searchQuery={searchQuery}
          setSortBy={setSortBy}
          setSearchQuery={setSearchQuery}
          handleClick={handleClick}
        />
      )}

      {!isLoading && mode === "view" && (
        <AnnouncementTab onBack={onBack} announcement={announcement} />
      )}
    </main>
  );
}

export default Announcement;
