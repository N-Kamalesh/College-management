import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlipCard from "./FlipCard";
import axios from "axios";
import Spinner from "../Spinner";
import { dateOptions } from "../../constants/utils";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { VITE_BASE_URL } = import.meta.env;
function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [courseInstructors, setCourseInstructors] = useState([]);
  const [error, setError] = useState("");
  const { user, token } = useSelector((state) => state.user);
  useEffect(
    function () {
      async function fetchInstructors() {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${VITE_BASE_URL}/student/dashboard?rollno=${user.rollno}&sem=${user.sem}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          if (response.data.success) {
            setCourseInstructors(response.data.data);
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
    [user.rollno, user.sem, token]
  );

  useEffect(
    function () {
      setTimeout(() => {
        setError("");
      }, 10000);
    },
    [error]
  );

  if (isLoading) return <Spinner />;
  return (
    <main className=" w-full min-h-screen ">
      <h1 className="text-center pt-5 text-3xl text-indigo-800 font-bold">
        Dashboard
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
      <div className="bg-indigo-800 m-10 rounded-3xl py-4 lg:py-9  h-auto  grid grid-cols-1 gap-0  lg:grid-cols-2 text-center grid-rows-auto ">
        <div className=" rounded-lg ">
          <div className="  rounded-lg m-3 mt-0 max-[520px]:h-auto h-16 grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100  p-2 max-[520px]:h-auto m-3 h-16 col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Name
            </div>
            <div className="bg-slate-100  p-2 max-[520px]:h-auto m-3 max-[520px]:mt-0 h-16 col-span-2    rounded-lg flex flex-col   justify-center items-center max-[380px]:text-xs">
              {user.fullname}
            </div>
          </div>
          <div className="  rounded-lg m-3   max-[520px]:h-auto h-16  grid  grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Roll No
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2    rounded-lg flex flex-col  justify-center items-center max-[380px]:text-xs">
              {user.rollno}
            </div>
          </div>
          <div className=" rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16 col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Gender
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.gender === "M" ? "Male" : "Female"}
            </div>
          </div>
          <div className="rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3  p-2 max-[520px]:h-auto h-16 col-span-1     rounded-lg flex flex-col   justify-center items-center">
              Date of Birth
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {new Date(user.dob).toLocaleDateString("en-US", dateOptions)}
            </div>
          </div>
          <div className="rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3  p-2 max-[520px]:h-auto h-16 col-span-1     rounded-lg flex flex-col   justify-center items-center">
              Address
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2 text-sm  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.address}
            </div>
          </div>
        </div>
        <div className=" rounded-lg   pb-2">
          <div className="  rounded-lg  m-3 mt-0   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Mobile
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2 rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.mobile}
            </div>
          </div>
          <div className="  rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Email
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16  col-span-2  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.email}
            </div>
          </div>
          <div className=" rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Department
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16   col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.deptname}
            </div>
          </div>
          <div className="  rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1 w-100   rounded-lg flex flex-col   justify-center items-center">
              Semester
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2 w-100  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.sem}
            </div>
          </div>
          <div className="  rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1 w-100   rounded-lg flex flex-col   justify-center items-center">
              Year of joining
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2 w-100  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.joinyear}
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center font-semibold text-indigo-800 pt-5 text-2xl md:text-3xl">
        Courses you&apos;re currently studying
      </h1>
      {courseInstructors.length === 0 ? (
        <p className="text-center mt-4">
          It seems like you&apos;re not enrolled in any courses currently
        </p>
      ) : (
        <div className=" m-10 flex shrink-0 h-auto py-4 px-4 overflow-x-auto justify-evenly">
          {courseInstructors.map((item, index) => (
            <FlipCard
              key={index}
              coursename={item.coursename}
              deptcode={item.deptcode}
              designation={item.designation}
              fullname={item.fullname}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
