import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner";
const { VITE_BASE_URL } = import.meta.env;

export default function StudentMarks() {
  const location = useLocation();
  const data = location.state;

  const [marks, setMarks] = useState({
    courseid: "",
    attendance: 0,
    sem: 1,
    internals: 0,
    externals: 0,
    coursename: "SAMPLE",
  });

  const [inputInternals, setInputInternals] = useState(marks.internals);
  const [inputExternals, setInputExternals] = useState(marks.externals);
  const [inputAttendance, setInputAttendance] = useState(marks.attendance);
  const [studentInfo, setStudentInfo] = useState({
    fullname: data.fullname,
    rollno: data.rollno,
    courseid: data.courseid,
    sem: data.sem,
    year: data.year,
  });
  const [newRollNo, setNewRollNo] = useState({
    rollno: data.rollno,
  });
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getStudentMarks() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/staff/courses/student?roll=${studentInfo.rollno}&cid=${studentInfo.courseid}&sem=${studentInfo.sem}&year=${studentInfo.year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.data) throw "Roll no Not in this course!";
        setInputAttendance(response.data.data.attendance);
        setInputInternals(response.data.data.internals);
        setInputExternals(response.data.data.externals);
        setMarks(response.data.data);
      } catch (error) {
        console.log(error);
        setInputAttendance(0);
        setInputInternals(0);
        setInputExternals(0);

        setMarks({
          courseid: "Not Valid",
          attendance: 0,
          sem: 0,
          internals: 0,
          externals: 0,
          coursename: "Not Valid",
        });
      } finally {
        setIsLoading(false);
      }
    }
    getStudentMarks();
  }, [studentInfo, token]);

  function handleStudentChange(event) {
    setNewRollNo({
      rollno: Number(event.target.value),
    });
  }

  function handleInputChange(event) {
    if (event.target.id === "attendance")
      setInputAttendance(Math.round(event.target.value));
    else if (event.target.id === "internals")
      setInputInternals(Math.round(event.target.value));
    else setInputExternals(Math.round(event.target.value));

    const saveButton = document.getElementById("saveButton");
    saveButton.style.backgroundColor = "#D2042D";
  }

  async function handleFind() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/staff/courses/student/name?rollno=${newRollNo.rollno}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentInfo({
        fullname: response.data.data?.fullname,
        rollno: newRollNo.rollno,
        courseid: data.courseid,
        sem: data.sem,
        year: data.year,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    const finalObject = {
      rollno: studentInfo.rollno,
      courseid: studentInfo.courseid,
      sem: studentInfo.sem,
      year: studentInfo.year,
      internals: inputInternals,
      externals: inputExternals,
      attendance: inputAttendance,
    };
    setIsSaving(true);
    try {
      await axios.patch(`${VITE_BASE_URL}/staff/courses/student`, finalObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const saveButton = document.getElementById("saveButton");
      if (marks.courseid === "Not Valid") {
        saveButton.style.backgroundColor = "#D2042D";
        history.back();
      } else {
        saveButton.style.backgroundColor = "#00B900";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  }
  if (isLoading) return <Spinner />;
  return (
    <main className="w-full min-h-screen text-center ">
      <div className="  text-center m-4 p-2">
        <h1 className="text-center pt-5 text-3xl text-indigo-800 font-bold">
          Attendance & Marks
        </h1>
      </div>
      <div className="flex justify-evenly items-center h-auto  flex-wrap p-8">
        <label className="p-2 m-2 font-semibold w-64 flex justify-between items-center">
          Roll No.
          <input
            onChange={handleStudentChange}
            name="rollno"
            id="rollno"
            placeholder="eg: 202..."
            className="m-3 p-2 border-solid border-2 border-black rounded-sm w-32"
            value={newRollNo.rollno}
          />
        </label>
        <label className="p-2 m-2 font-semibold w-64 flex justify-between items-center">
          Course ID
          <input
            className="m-3 p-2 border-solid border-2 border-black rounded-sm w-32 text-center"
            value={marks.courseid || ""}
            disabled
          />
        </label>
        <label className="m-2 p-2 font-semibold w-64 flex justify-between items-center">
          Semester
          <input
            className="m-3 p-2 border-solid border-2 border-black rounded-sm w-32 text-center"
            value={marks.sem || ""}
            disabled
          />
        </label>
        <label className="m-2 p-2 font-semibold w-64 flex justify-between items-center">
          {" "}
          Year
          <input
            className="m-3 p-2 border-solid border-2 border-black rounded-sm w-32 text-center"
            value={marks.year || ""}
            disabled
          />
        </label>
        <button
          onClick={handleFind}
          id="find"
          className="bg-indigo-600 hover:bg-indigo-800 active:bg-indigo-900 text-white px-8 py-2 rounded-xl w-auto h-auto mx-8"
        >
          Find
        </button>
      </div>

      <div className=" m-10 mt-12 overflow-x-auto ">
        <table className="shadow-2xl  border border-indigo-100  w-full">
          <thead className="text-white">
            <tr>
              <th className="py-2 bg-indigo-900 border border-indigo-100">
                Roll No
              </th>
              <th className="py-2 bg-indigo-900 border border-indigo-100">
                Name
              </th>
              <th className="py-2 bg-indigo-900 border border-indigo-100">
                Attendance
              </th>
              <th className="py-2 bg-indigo-900 border border-indigo-100">
                Internals
              </th>
              <th className="py-2 bg-indigo-900 border border-indigo-100">
                Externals
              </th>
            </tr>
          </thead>
          <tbody className="text-white text-centre">
            <tr className="bg-indigo-800   cursor-pointer ">
              <td className="py-2 px-6 border border-indigo-100">
                {marks.rollno || ""}
              </td>
              <td className="py-2 px-6 border border-indigo-100">
                {marks.courseid === "Not Valid"
                  ? "Not Valid"
                  : studentInfo.fullname}
              </td>
              <td className="py-2 px-6 border border-indigo-100">
                <input
                  onChange={handleInputChange}
                  className="bg-indigo-800 focus:outline-none  focus:bg-indigo-600 focus:border focus:border-white hover:bg-indigo-600 cursor-pointer  text-center rounded-md p-3"
                  type="text"
                  value={inputAttendance || ""}
                  id="attendance"
                  autoComplete="off"
                />
              </td>
              <td className="py-2 px-6 border border-indigo-100">
                <input
                  onChange={handleInputChange}
                  className="bg-indigo-800 focus:outline-none  focus:bg-indigo-600 focus:border focus:border-white hover:bg-indigo-600 cursor-pointer  text-center rounded-md p-3"
                  type="text"
                  value={inputInternals || ""}
                  id="internals"
                  autoComplete="off"
                />
              </td>
              <td className="py-2 px-6 border border-indigo-100">
                <input
                  onChange={handleInputChange}
                  className="bg-indigo-800 focus:outline-none  focus:bg-indigo-600 focus:border focus:border-white hover:bg-indigo-600 cursor-pointer  text-center rounded-md p-3"
                  type="text"
                  value={inputExternals || ""}
                  id="externals"
                  autoComplete="off"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="m-8">
        <button
          id="saveButton"
          onClick={handleSave}
          className="staff-course-button bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white px-8 py-2 rounded-xl w-auto h-auto mx-8"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </main>
  );
}
