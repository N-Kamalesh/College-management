import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner";
import { createArray, getCgpa } from "../../../constants/utils";

const { VITE_BASE_URL } = import.meta.env;
export default function Marks() {
  const [marks, setMarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = useSelector((state) => state.user);
  const [sortBy, setSortBy] = useState("all");

  const sems = createArray(marks);

  const sortedMarks =
    sortBy === "all"
      ? marks
      : marks.filter((mark) => mark.sem === Number(sortBy));

  useEffect(
    function () {
      async function fetchInstructors() {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${VITE_BASE_URL}/student/marks/${user.rollno}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          if (response.data.success) {
            setMarks(response.data.data);
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
      fetchInstructors();
    },
    [user.rollno, token]
  );

  if (isLoading) return <Spinner />;
  return (
    <main className="w-full min-h-screen text-center ">
      <h1 className="text-center pt-5 text-3xl text-indigo-800 font-bold">
        Attendance & Marks
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
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="text-center border-2 mt-8 border-indigo-200 w-4/5 md:w-2/5 max-w-2xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none "
      >
        <option value="all">All Semesters</option>
        {sems.map((sem) => (
          <option key={sem} value={sem}>
            Sem - {sem}
          </option>
        ))}
      </select>
      {sortedMarks.length === 0 ? (
        <p className="text-center mt-4">
          Enroll in courses to get marks and attendance
        </p>
      ) : (
        <div className="w-4/5 overflow-x-auto mx-auto my-10 ">
          <table className=" border-2  border-indigo-400 w-full ">
            <thead className="text-white ">
              <tr>
                <th className="py-3 bg-indigo-900 border border-indigo-100 px-2">
                  Course id
                </th>
                <th className="py-3 bg-indigo-900 border border-indigo-100 px-2">
                  Course Name
                </th>
                <th className="py-3 bg-indigo-900 border border-indigo-100 px-2">
                  Attendance
                </th>
                <th className="py-3 bg-indigo-900 border border-indigo-100 px-2">
                  Internals
                </th>
                <th className="py-3 bg-indigo-900 border border-indigo-100 px-2">
                  Externals
                </th>
                <th className="py-3 bg-indigo-900 border border-indigo-100 px-2">
                  Total
                </th>
                <th className="py-3 bg-indigo-900 border border-indigo-100 px-2">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {sortedMarks.map((mark) => (
                <tr
                  key={mark.courseid}
                  className="bg-indigo-800  hover:bg-indigo-600   cursor-pointer duration-150"
                >
                  <td className="py-3 px-6  border border-indigo-100">
                    {mark.courseid}
                  </td>
                  <td className="py-3 px-6  border border-indigo-100">
                    {mark.coursename}
                  </td>
                  <td className="py-3 px-6  border border-indigo-100">
                    {mark.attendance}
                  </td>
                  <td className="py-3 px-6  border border-indigo-100">
                    {mark.internals}
                  </td>
                  <td className="py-3 px-6  border border-indigo-100">
                    {mark.externals}
                  </td>
                  <td className="py-3 px-6  border border-indigo-100">
                    {mark.total}
                  </td>
                  <td className="py-3 px-6  border border-indigo-100">
                    {mark.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="w-4/5 px-4 py-2 bg-indigo-800 text-white flex justify-between mx-auto mb-10">
        <span>Current CGPA</span>
        <span>{getCgpa(marks).toFixed(2)}</span>
      </p>
    </main>
  );
}
