import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const MOB_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
const SID_REGEX = /^2[\d]{3}$/;

StaffEdit.propTypes = {
  onSubmit: PropTypes.func,
  staff: PropTypes.object,
  onBack: PropTypes.func,
};

function StaffEdit({ onSubmit, staff, onBack }) {
  const [data, setData] = useState({
    fullname: staff.fullname,
    staffid: String(staff.staffid),
    email: staff.email,
    mobile: staff.mobile,
    designation: staff.designation,
    gender: staff.gender,
    joindate: staff.joindate,
    highest_qualification: staff.highest_qualification,
    deptcode: String(staff.deptcode),
  });

  const validEmail = EMAIL_REGEX.test(data.email);
  const validMob = MOB_REGEX.test(data.mobile);
  const validSId = SID_REGEX.test(data.staffid);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((curr) => ({ ...curr, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(data);
  }
  useEffect(
    function () {
      var dateObject = new Date(data.joindate);
      dateObject.setHours(dateObject.getHours() + 5);
      dateObject.setMinutes(dateObject.getMinutes() + 30);
      var istDate = dateObject.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
      var istDateComponents = istDate.split(",")[0].split("/");
      var year = istDateComponents[2];
      var month = istDateComponents[1];
      var day = istDateComponents[0];
      if (month.length === 1) {
        month = "0" + month;
      }
      if (day.length === 1) {
        day = "0" + day;
      }
      var yyyy_mm_dd = year + "-" + month + "-" + day;
      console.log(yyyy_mm_dd);
      setData((data) => ({ ...data, joindate: yyyy_mm_dd }));
    },
    [data.joindate]
  );
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-center gap-4 overflow-y-scroll h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800"
    >
      <button
        className="text-xl lg:text-2xl absolute  left-2 lg:left-5 top-1 lg:top-auto"
        type="button"
        onClick={onBack}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <input
        className="border-2 mt-6 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the staff id"
        type="text"
        name="staffid"
        value={data.staffid}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the fullname"
        type="text"
        name="fullname"
        value={data.fullname}
        autoComplete="off"
        onChange={handleChange}
      />
      <select
        value={data.gender}
        onChange={handleChange}
        name="gender"
        className="text-center border-2 mt-2 md:mt-0  border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
      >
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <input
        className="px-4 py-2 border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the designation"
        type="date"
        name="joindate"
        value={data.joindate}
        autoComplete="off"
        onChange={handleChange}
      />

      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the mobile number"
        type="text"
        name="mobile"
        value={data.mobile}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the email"
        type="email"
        name="email"
        value={data.email}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the highest qualification"
        type="text"
        name="highest_qualification"
        value={data.highest_qualification}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the department code"
        type="text"
        name="deptcode"
        value={data.deptcode}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the designation"
        type="text"
        name="designation"
        value={data.designation}
        autoComplete="off"
        onChange={handleChange}
      />

      <button
        className="bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-800 cursor-pointer text-sm md:text-lg rounded-md text-white px-4 py-2 "
        disabled={
          !data.fullname.trim() ||
          !String(data.joindate).trim() ||
          !validMob ||
          !validSId ||
          !validEmail ||
          !data.designation.trim() ||
          !data.highest_qualification.trim() ||
          !String(data.deptcode).trim()
        }
      >
        Modify Staff
      </button>
    </form>
  );
}

export default StaffEdit;
