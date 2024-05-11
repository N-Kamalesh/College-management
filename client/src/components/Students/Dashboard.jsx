import { useSelector } from "react-redux";
function Dashboard() {
  const { user } = useSelector((state) => state.user);

  return (
    <main className=" w-full min-h-screen break-all">
      <div className="bg-indigo-800 m-10 rounded-3xl py-4 lg:py-9  h-auto  grid grid-cols-1 gap-0  lg:grid-cols-2 text-center">
        <div className=" rounded-lg  ">
          <div className="  rounded-lg m-3 mt-0 h-16 grid grid-cols-3 gap-0  ">
            <div className="bg-slate-100  p-2 h-16 m-3 col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Name
            </div>
            <div className="bg-slate-100  p-2 h-16 m-3  col-span-2    rounded-lg flex flex-col   justify-center items-center">
              {user.fullname}
            </div>
          </div>
          <div className="  rounded-lg m-3   h-16  grid  grid-cols-3 gap-0 ">
            <div className="bg-slate-100 m-3 p-2 h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Roll No
            </div>
            <div className="bg-slate-100 m-3 p-2 h-16 col-span-2    rounded-lg flex flex-col  justify-center items-center">
              {user.rollno}
            </div>
          </div>
          <div className=" rounded-lg m-3   h-16  grid grid-cols-3 gap-0 ">
            <div className="bg-slate-100 m-3 p-2 h-16 col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Semester
            </div>
            <div className="bg-slate-100 m-3 p-2 h-16 col-span-2   rounded-lg flex flex-col justify-center items-center">
              {user.sem}
            </div>
          </div>
          <div className="rounded-lg m-3   h-16  grid grid-cols-3 gap-0 ">
            <div className="bg-slate-100 m-3  p-2 h-16 col-span-1     rounded-lg flex flex-col   justify-center items-center">
              Email id
            </div>
            <div className="bg-slate-100 m-3 p-2 h-16 col-span-2   rounded-lg flex flex-col justify-center items-center">
              {user.email}
            </div>
          </div>
        </div>
        <div className=" rounded-lg   pb-2">
          <div className="  rounded-lg  m-3 mt-0   h-16  grid grid-cols-3 gap-0 ">
            <div className="bg-slate-100 m-3 p-2 h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Mobile
            </div>
            <div className="bg-slate-100 m-3 p-2 h-16 col-span-2   rounded-lg flex flex-col justify-center items-center">
              {user.mobile}
            </div>
          </div>
          <div className="  rounded-lg m-3   h-16  grid grid-cols-3 gap-0 ">
            <div className="bg-slate-100 m-3 p-2 h-16  col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Gender
            </div>
            <div className="bg-slate-100 m-3 p-2 h-16  col-span-2  rounded-lg flex flex-col justify-center items-center">
              {user.gender}
            </div>
          </div>
          <div className=" rounded-lg m-3   h-16  grid grid-cols-3 gap-0 ">
            <div className="bg-slate-100 m-3 p-2 h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Address
            </div>
            <div className="bg-slate-100 m-3 p-2 h-16  text-sm col-span-2   rounded-lg flex flex-col justify-center items-center ">
              324/234,ramasamy nagar,judge road bus stop, salem-8{" "}
            </div>
          </div>
          <div className="  rounded-lg m-3   h-16  grid grid-cols-3 gap-0 ">
            <div className="bg-slate-100 m-3 p-2 h-16  col-span-1 w-100   rounded-lg flex flex-col   justify-center items-center">
              Department
            </div>
            <div className="bg-slate-100 m-3 p-2 h-16 col-span-2 w-100  rounded-lg flex flex-col justify-center items-center">
              {user.deptcode}
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-yellow-400  m-10 grid gap-2 sm:grid-cols-4 h-80">
        <div className=" bg-white h-50 rounded-3xl mx-10 flex flex-col  justify-center items-centre">
          card 1
        </div>
        <div className=" bg-white h-50 rounded-3xl mx-10 flex flex-col   justify-center items-centre">
          card 2
        </div>
        <div className=" bg-white h-50  rounded-3xl mx-10 flex flex-col   justify-center items-centre">
          {" "}
          card 3
        </div>
        <div className=" bg-white h-50  rounded-3xl mx-10 flex flex-col  justify-center items-centre">
          {" "}
          card 4
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
