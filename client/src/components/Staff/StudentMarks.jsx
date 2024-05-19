import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const { VITE_BASE_URL } = import.meta.env;

export default function StudentMarks(props) {
    const location = useLocation();
    const data = location.state;

    const [marks, setMarks] = useState({
      "courseid": "",
      "attendance": 0,
      "sem": 1,
      "internals": 0,
      "externals": 0,
      "coursename": "SAMPLE",
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

    useEffect(() => {
      async function getStudentMarks(){
        try {
          const response = await axios.get(`${VITE_BASE_URL}/staff/courses/student?roll=${studentInfo.rollno}&cid=${studentInfo.courseid}&sem=${studentInfo.sem}&year=${studentInfo.year}`);

          if(!response.data.data) throw 'Roll no Not in this course!';
          setInputAttendance(response.data.data.attendance);
          setInputInternals(response.data.data.internals);
          setInputExternals(response.data.data.externals);
          // Marks contain courseid, ext, int, atte, grade, total, rollno, sem, year
          setMarks(response.data.data)
        } catch (error) {
          console.error(error);
          setInputAttendance(0);
          setInputInternals(0);
          setInputExternals(0);

          setMarks(
            {
              "courseid": "Not Valid",
              "attendance": 0,
              "sem": 0,
              "internals": 0,
              "externals": 0,
              "coursename": "Not Valid",
            }
          );
        }
      }
      getStudentMarks();
    }, [studentInfo]);

    const handleStudentChange = (event) => {
      setNewRollNo({
        rollno: Number(event.target.value),
      });
    }
    const handleInputChange = (event) => {
      if(event.target.id === 'attendance') setInputAttendance(Math.round(event.target.value));
      else if(event.target.id === 'internals') setInputInternals(Math.round(event.target.value));
      else setInputExternals(Math.round(event.target.value));

      const saveButton = document.getElementById("saveButton");
      saveButton.style.backgroundColor = '#D2042D';
    }

    const handleFind = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/staff/courses/student/name?rollno=${newRollNo.rollno}`);
        setStudentInfo(
          {
            fullname: response.data.data.fullname,
            rollno: newRollNo.rollno,
            courseid: data.courseid,
            sem: data.sem,
            year: data.year,
          }
        );
      } catch (error) {
        console.log(error)
      }
    }

    async function handleSave(){
      const finalObject ={
        rollno: studentInfo.rollno,
        courseid: studentInfo.courseid,
        sem: studentInfo.sem,
        year: studentInfo.year,
        internals: inputInternals,
        externals: inputExternals,
        attendance: inputAttendance,
      };
      try {
        const response = await axios.patch(`${VITE_BASE_URL}/staff/courses/student`, finalObject);
        const saveButton = document.getElementById("saveButton");
        marks.courseid === "Not Valid" ? saveButton.style.backgroundColor = '#D2042D' : saveButton.style.backgroundColor = '#AAFF00';
        history.back();
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <main className="w-full min-h-screen text-center ">
        <div className="  text-center m-10 p-2">
          <h1 className="text-black-100 text-4xl font-serif">
            ATTENDANCE AND MARKS
          </h1>
        </div>
        <div className="flex justify-evenly items-center h-auto p-1 flex-wrap ">
          <label className="p-4 m-2 font-semibold">Roll No. 
            <input onChange={handleStudentChange} name="rollno" id="rollno" placeholder="eg: 202..." className="m-3 p-2 border-solid border-2 border-black rounded-sm" value={newRollNo.rollno}/>
          </label>
          <label  className="p-4 m-2 font-semibold" >Course ID 
          <input className="m-3 p-2 border-solid border-2 border-black rounded-sm w-32 text-center" value={marks.courseid} disabled/>
          </label>
          <label  className="m-2 p-4 font-semibold ">Semester
          <input className="m-3 p-2 border-solid border-2 border-black rounded-sm w-32 text-center" value={marks.sem} disabled/>
          </label>
          <label  className="m-2 p-4 font-semibold"> Year
            <input className="m-3 p-2 border-solid border-2 border-black rounded-sm w-32 text-center" value={marks.year} disabled/>
          </label>
          <button onClick={handleFind} id="find" className="bg-sky-200 px-8 py-2 rounded-xl w-auto h-auto mx-8">Find</button>
        </div>
  
        <div className=" m-10 mt-32  ">
          <table className="shadow-2xl  border-2 border-cyan-400  w-full">
            <thead className="text-white">
              <tr>
                <th className="py-2 bg-cyan-800">Roll No</th>
                <th className="py-2 bg-cyan-800">Name</th>
                <th className="py-2 bg-cyan-800">Attendance</th>
                <th className="py-2 bg-cyan-800">Internals</th>
                <th className="py-2 bg-cyan-800">Externals</th>
              </tr>
            </thead>
            <tbody className="text-black text-centre">
              <tr className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300">
                <td className="py-2 px-6">{marks.rollno}</td>
                <td className="py-2 px-6">{marks.courseid === "Not Valid" ? "Not Valid" : studentInfo.fullname}</td>
                <td className="py-2 px-6" ><input onChange={handleInputChange} className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300 text-center rounded-md p-3" type="text" value={inputAttendance || ''} id="attendance" /></td>
                <td className="py-2 px-6" ><input onChange={handleInputChange} className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300 text-center rounded-md p-3" type="text" value={inputInternals  || ''} id="internals" /></td>
                <td className="py-2 px-6" ><input onChange={handleInputChange} className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300 text-center rounded-md p-3" type="text" value={inputExternals  || ''} id="externals"/></td>
              </tr>
            </tbody>
          </table>
          <div className="m-8">
            <button id="saveButton" onClick={handleSave} className='staff-course-button bg-sky-200 px-8 py-2 rounded-xl w-auto h-auto mx-8'>Save</button>
          </div>
        </div>
      </main>
    );
  }
  