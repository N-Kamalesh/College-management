import { useSelector } from "react-redux";
import { dateOptions } from "../constants/utils";

function StaffDashBoard() {
  const { user } = useSelector((state) => state.user);

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen ">
      <h1 className="text-center pt-5 text-3xl text-indigo-800 font-bold">
        Dashboard
      </h1>
      <div className="w-[95%] bg-indigo-800 m-10 rounded-3xl py-4 lg:py-9  h-auto  grid grid-cols-1 gap-0  lg:grid-cols-2 text-center grid-rows-auto shadow-3xl">
        <div className=" rounded-lg ">
          <div className="  rounded-lg m-3 mt-0 max-[520px]:h-auto h-16 grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className=" bg-slate-100  p-2 max-[520px]:h-auto m-3 h-16 col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Name
            </div>
            <div className="bg-slate-100  p-2 max-[520px]:h-auto m-3 max-[520px]:mt-0 h-16 col-span-2    rounded-lg flex flex-col   justify-center items-center max-[380px]:text-xs">
              {user.fullname}
            </div>
          </div>
          <div className="  rounded-lg m-3   max-[520px]:h-auto h-16  grid  grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Staff ID
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2    rounded-lg flex flex-col  justify-center items-center max-[380px]:text-xs">
              {user.staffid}
            </div>
          </div>
          <div className=" rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16 col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Designation
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.designation}
            </div>
          </div>
          <div className="rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3  p-2 max-[520px]:h-auto h-16 col-span-1     rounded-lg flex flex-col   justify-center items-center">
              Qualification
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.highest_qualification}
            </div>
          </div>
        </div>
        <div className=" rounded-lg   pb-2">
          <div className="  rounded-lg  m-3 mt-0   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Department
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.deptname}
            </div>
          </div>
          <div className="  rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1   rounded-lg flex flex-col   justify-center items-center">
              Join Date
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16  col-span-2  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {new Date(user.joindate).toLocaleDateString("en-US", dateOptions)}
            </div>
          </div>
          <div className=" rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1    rounded-lg flex flex-col   justify-center items-center">
              Email
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16  col-span-2   rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.email}
            </div>
          </div>
          <div className="  rounded-lg m-3   max-[520px]:h-auto h-16  grid grid-cols-3 gap-0 max-[520px]:flex max-[520px]:flex-col">
            <div className="bg-slate-100 m-3 p-2 max-[520px]:h-auto h-16  col-span-1 w-100   rounded-lg flex flex-col   justify-center items-center">
              Mobile
            </div>
            <div className="bg-slate-100 m-3 max-[520px]:mt-0 p-2 max-[520px]:h-auto h-16 col-span-2 w-100  rounded-lg flex flex-col justify-center items-center max-[380px]:text-xs">
              {user.mobile}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default StaffDashBoard;
