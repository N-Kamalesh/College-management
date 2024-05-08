import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

function StaffDashBoard() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { token, user } = useSelector((state) => state.user);
    const [staffDetail, setStaffDetail] = useState({}); 

    const dateString = user.joindate;
    const date = new Date(dateString);
    const normalDate = date.toLocaleDateString(); // Converts to normal date format without time

    // useEffect(
    //     function () {
    //         const staff_id = user.staffid;
    //         async function fetchStaffDetails(){
    //             try {
    //                 setIsLoading(true);
    //                 const response = await axios.get(
    //                   `${VITE_BASE_URL}/staff/${staff_id}`
    //                 );
    //                 // console.log(response);
    //                 if (response.data.success) {
    //                     setStaffDetail(response.data.data);
    //                     // console.log(staffDetail);
    //                   console.log(response.data.data);
    //                 } else {
    //                   setError(response.data.message);
    //                 }
    //               } catch (error) {
    //                 console.log(error);
    //                 if (error?.response?.data?.message)
    //                   setError(error?.response?.data?.message);
    //                 else setError("Something went wrong! Please try again.");
    //               } finally {
    //                 setIsLoading(false);
    //               }
    //         }
    //         fetchStaffDetails();
    //     },
    //     [user.staffid]
    // );
    return (
        <main className="staff-layout w-full py-5 bg-indigo-500 border-transparent border-8 lg:mx-32 lg:my-24 rounded-lg mx-1 my-4">
            <div className="staff-layout one grid grid-rows-3 grid-cols-12  h-40 my-12 bg-gray-100 rounded-lg">
                <div className="one lg:col-span-3 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-6">ID</div>
                <div className="one staff lg:col-span-9 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-6">{user.staffid}</div>
                <div className="one lg:col-span-3 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-6">Name</div>
                <div className="one staff  lg:col-span-6 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-6">{user.fullname}</div>
                <div className="one lg:col-span-1 text-xl flex align-middle items-center  border-solid border-2 border-sky-500 col-span-10">Sex</div>
                <div className="one staff  col-span-2 text-xl flex align-middle items-center border-solid border-2 border-sky-500">{user.gender}</div>
                <div className="one lg:col-span-3 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-6">Designation</div>
                <div className="one staff lg:col-span-9 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-6">{user.designation}</div>
            </div>
            <div className="staff-layout two grid grid-rows-2 grid-cols-12 h-32 my-12 bg-gray-100 rounded-lg">
                <div className="two md:col-span-4 text-md flex align-middle items-center border-solid border-2 border-sky-500 col-span-12">Highest Qualification</div>
                <div className="two staff md:col-span-8 text-md flex align-middle items-center border-solid border-2 border-sky-500 col-span-12">{user.highest_qualification}</div>
                <div className="two md:col-span-4 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-12" border-solid border-2 border-sky-500>Date of Joining</div>
                <div className="two staff md:col-span-8 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-12">{normalDate}</div>
            </div>
            <div className="staff-layout contact grid grid-rows-3 grid-cols-12 bg-gray-100 my-12 h-40 rounded-lg">
                <div className="contact  col-span-12 text-xl flex align-middle items-center border-solid border-2 border-sky-500">Contact</div>
                <div className="contact  md:col-span-6 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-12">Email</div>
                <div className="contact  md:col-span-6 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-12">Mobile</div>
                <div className="contact staff md:col-span-6 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-12">{user.email}</div>
                <div className="contact staff md:col-span-6 text-xl flex align-middle items-center border-solid border-2 border-sky-500 col-span-12">{user.mobile}</div>
            </div>
        </main>
    );
}

export default StaffDashBoard;