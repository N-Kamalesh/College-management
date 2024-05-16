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
      "sem": 3,
      "internals": 0,
      "externals": 0,
      "coursename": "SAMPLE",
  });

  const [inputInternals, setInputInternals] = useState(marks.internals);
  const [inputExternals, setInputExternals] = useState(marks.externals);
  const [inputAttendance, setInputAttendance] = useState(marks.attendance);

    useEffect(() => {
      async function getStudentMarks(){
        try {
          const response = await axios.get(`${VITE_BASE_URL}/staff/courses/student?roll=${data.rollno}&cid=${data.courseid}&sem=${data.sem}&year=${data.year}`);
          setInputAttendance(response.data.data.attendance);
          setInputInternals(response.data.data.internals);
          setInputExternals(response.data.data.externals);
          setMarks(response.data.data)
        } catch (error) {
          console.error(error);
        }
      }
      getStudentMarks();
    }, [data]);


    const handleInputChange = (event) => {
      if(event.target.id === 'attendance') setInputAttendance(Math.round(event.target.value));
      else if(event.target.id === 'internals') setInputInternals(Math.round(event.target.value));
      else setInputExternals(Math.round(event.target.value));
      
    }
    async function handleSave(){
      const finalObject ={
        rollno: data.rollno,
        courseid: data.courseid,
        sem: data.sem,
        year: data.year,
        internals: inputInternals,
        externals: inputExternals,
        attendance: inputAttendance,
      };
      try {
        const response = await axios.patch(`${VITE_BASE_URL}/staff/courses/student`, finalObject);
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
  
        <div className="float-right text-black-100    rounded-full flex justify-center items-center p-3 text-black-100 mr-20 mb-20">
          <form>
            <select disabled>
              <option>SEM {data.sem} </option>
            </select>
          </form>
        </div>
  
        <div className=" m-20 mt-30   text-center">
          <table className="shadow-2xl  border-2 border-cyan-400  w-full">
            <thead className="text-white">
              <tr>
                <th className="py-3 bg-cyan-800">Roll No</th>
                <th className="py-3 bg-cyan-800">Name</th>
                <th className="py-3 bg-cyan-800">Course id</th>
                <th className="py-3 bg-cyan-800">Course Name</th>
                <th className="py-3 bg-cyan-800">Attendance</th>
                <th className="py-3 bg-cyan-800">Internals</th>
                <th className="py-3 bg-cyan-800">Externals</th>
              </tr>
            </thead>
            <tbody className="text-black text-centre">
              <tr className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300">
                <td className="py-3 px-6">{data.rollno}</td>
                <td className="py-3 px-6">{data.fullname}</td>
                <td className="py-3 px-6">{marks.courseid}</td>
                <td className="py-3 px-6">{data.coursename}</td>
                <td className="py-3 px-6" ><input onChange={handleInputChange} className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300 text-center rounded-md p-3" type="text" value={inputAttendance} id="attendance" /></td>
                <td className="py-3 px-6" ><input onChange={handleInputChange} className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300 text-center rounded-md p-3" type="text" value={inputInternals} id="internals" /></td>
                <td className="py-3 px-6" ><input onChange={handleInputChange} className="bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300 text-center rounded-md p-3" type="text" value={inputExternals} id="externals"/></td>
              </tr>
            </tbody>
          </table>
          <div className="m-8">
            <button onClick={handleSave} className="staff-course-button bg-sky-200 px-8 py-2 rounded-xl w-auto h-auto mx-8">Save</button>
          </div>
        </div>
      </main>
    );
  }
  