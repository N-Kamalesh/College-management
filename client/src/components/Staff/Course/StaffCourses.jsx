import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StaffCourseButton from "./StaffCourseButton";
import StaffCourseListItem from "./StaffCourseListItem";
import axios from "axios";
import Spinner from "../../Spinner";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
const { VITE_BASE_URL } = import.meta.env;

function StaffCourses() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { token, user } = useSelector((state) => state.user);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getStaffCourses() {
        setisLoading(true);
        try {
          const response = await axios.get(
            `${VITE_BASE_URL}/staff/courses/course`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
        }
      }
      async function createView() {
        try {
          await axios.get(
            `${VITE_BASE_URL}/staff/courses/create?staffid=${user.staffid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
          if (error?.response?.data?.message)
            setError(error?.response?.data?.message);
          else setError("Something went wrong! Please try again.");
        } finally {
          setisLoading(false);
        }
      }
      createView();
      getStaffCourses();
    },
    [students, user.staffid, token]
  );
  useEffect(
    function () {
      async function getAllStudents() {
        setisLoading(true);
        try {
          const response = await axios.get(
            `${VITE_BASE_URL}/staff/courses/all`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
          setisLoading(false);
        }
      }
      getAllStudents();
    },
    [token]
  );

  async function getStudents(e) {
    setSelectedCourse(e.target.id);
    setisLoading(true);
    try {
      const courseid = e.target.id;
      const response = await axios.get(
        `${VITE_BASE_URL}/staff/courses?c_id=${courseid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      setisLoading(false);
    }
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="staff-course-outer w-screen">
      <h1 className="text-center pt-5 text-3xl text-indigo-800 font-bold mb-4">
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
      {courses.length === 0 ? (
        <p className="text-center my-4">
          It seems like you&apos;re not teaching courses currently!
        </p>
      ) : (
        <div className="staff-course-button-container mt-8 flex justify-around items-center flex-wrap gap-3 w-[90%] max-w-6xl text-sm mx-auto">
          {courses.map((item) => (
            <StaffCourseButton
              key={item.courseid}
              staffid={user.staffid}
              id={item.courseid}
              text={item.coursename}
              onClickHandler={getStudents}
              selectedCourse={selectedCourse}
            />
          ))}
        </div>
      )}
      <h1 className="text-center font-semibold text-indigo-800 pt-5 mt-4 text-2xl md:text-3xl">
        Students
      </h1>
      {students.length === 0 ? (
        <p className="text-center my-4">
          It seems like no students are studying under you!
        </p>
      ) : (
        <ul className="staff-course-ul h-[55vh] flex flex-col items-center mt-4 mb-10 overflow-y-auto w-[90%] max-w-6xl mx-auto border-2 border-indigo-800">
          {students.map((item, index) => (
            <StaffCourseListItem
              key={index}
              courseid={item.courseid}
              rollno={item.rollno}
              fullname={item.fullname}
              deptcode={item.deptcode}
              coursename={item.coursename}
              year={item.year}
              sem={item.sem}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default StaffCourses;
