import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import FlipCard from './FlipCard'
import axios from 'axios';

function Dashboard() { 
  const { VITE_BASE_URL } = import.meta.env;
  const {user}=useSelector(state=>state.user);
  const [courseInstructors, setCourseInstructors] = useState(
      [
            {
                  coursename: "newCourse",
                  fullname: "buddys instructor",
                  deptcode: 102,
                  designation: "phd in something",
            },
            {
                  coursename: "newCourse",
                  fullname: "buddys instructor",
                  deptcode: 102,
                  designation: "phd in something",
            },
            {
                  coursename: "newCourse",
                  fullname: "buddys instructor",
                  deptcode: 102,
                  designation: "phd in something",
            },
            {
                  coursename: "newCourse",
                  fullname: "buddys instructor",
                  deptcode: 102,
                  designation: "phd in something",
            },
            {
                  coursename: "newCourse",
                  fullname: "buddys instructor",
                  deptcode: 102,
                  designation: "phd in something",
            },
      ]
      );
  useEffect(
      function() {
            async function fetchInstructors(){
                  try {
                        const response = await axios.get(`${VITE_BASE_URL}/announcement`);
                        // setCourseInstructors(response);
                  } catch (error) {
                        console.log("Error in fetchInstructions");
                  }
            }
            fetchInstructors();
      }
      , 
      []
  );
  // {"user":"{\"isAuthenticated\":true,\"user\":{\"rollno\":2022103512,\"email\":\"abinaya1510@gmail.com\",\"fullname\":\"Dev…
  return (
    <main className=' w-full min-h-screen break-all'>
    <div div className='bg-indigo-800 m-10 rounded-3xl py-4 lg:py-9  h-auto  grid grid-cols-1 gap-0  lg:grid-cols-2 text-center grid-rows-auto'>
      <div  className=' rounded-lg '>
            <div className='  rounded-lg m-3 mt-0 max-[520px]:h-auto h-16 grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'>
                <div className='bg-slate-100  p-2 max-[520px]:h-auto m-3 h-16 col-span-1   rounded-lg flex flex-col   justify-center items-center'>Name</div>
                <div className='bg-slate-100  p-2 max-[520px]:h-auto m-3 max-[520px]:mt-0 h-16 col-span-2    rounded-lg flex flex-col   justify-center items-center max-[380px]:text-xs'>{user.fullname}</div>
           </div>
          <div  className='  rounded-lg m-3   max-[520px]:h-auto h-16  grid  grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'> 
                <div className='bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center'>Roll No</div>         
                <div className='bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2    rounded-lg flex flex-col  justify-center items-center max-[380px]:text-xs'>{user.rollno}</div>
          </div> 
          <div div className=' rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'>
                <div className='bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16 col-span-1   rounded-lg flex flex-col   justify-center items-center'>Semester</div>
                <div className='bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs' >{user.sem}</div>
          </div>
          <div div className='rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'>
                <div className='bg-slate-100 m-3  p-2 max-[520px]:h-auto h-16 col-span-1     rounded-lg flex flex-col   justify-center items-center'>Email id</div>
                <div className='bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs' >{user.email}</div>
            </div> 
      </div>
      <div  className=' rounded-lg   pb-2'>
            <div  className='  rounded-lg  m-3 mt-0   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'>
                <div className='bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center'>Mobile</div>
                <div className='bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs' >{user.mobile}</div>
            </div>
            <div className='  rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'>
                <div className='bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1   rounded-lg flex flex-col   justify-center items-center'>Gender</div>
                <div className='bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16  col-span-2  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs' >{user.gender}</div>
            </div>
            <div className=' rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'>
                  <div className='bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center'>Address</div>
                  <div className='bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16  text-sm col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs' >{user.address} </div>
            </div>          
            <div  className='  rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col'>
                    <div className='bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1 w-100   rounded-lg flex flex-col   justify-center items-center'>Department</div>
                    <div className='bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2 w-100  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs' >{user.deptcode}</div>
            </div> 
      </div>
      </div>

      <div  className=' bg-indigo-800  m-10 flex shrink-0 h-auto py-4 px-4 overflow-x-auto justify-between'>
        {courseInstructors.map(
            (item, index) => <FlipCard key={index} coursename={item.coursename} deptcode={item.deptcode} designation={item.designation} fullname={item.fullname} />
        )}
      </div>
    </main>
  );
}

export default Dashboard;
