import { useState } from "react";
import PropTypes from "prop-types";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

StudentNew.propTypes = {
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
};

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const MOB_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
const RNO_REGEX = /^20[\d]{8}$/;

function StudentNew({ onSubmit, onBack }) {
  const [data, setData] = useState({
    fullname: "",
    rollno: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    gender: "M",
    dob: "",
    joinyear: "",
    deptcode: "",
  });

  const validPwd = PWD_REGEX.test(data.password);
  const validEmail = EMAIL_REGEX.test(data.email);
  const validMob = MOB_REGEX.test(data.mobile);
  const validRno = RNO_REGEX.test(data.rollno);
  const validYear =
    Number(data.joinyear) < new Date().getFullYear() &&
    Number(data.joinyear) > 2000;

  function handleChange(e) {
    const { name, value } = e.target;
    setData((curr) => ({ ...curr, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(data);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-center gap-4 overflow-y-auto h-[85vh] w-[90%] max-w-6xl p-4 border-2 border-indigo-800"
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
        placeholder="Enter the roll number"
        type="text"
        name="rollno"
        value={data.rollno}
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
        placeholder="Enter the address"
        type="date"
        name="dob"
        value={data.dob}
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="border-2 mt-2 lg:mt-0 border-indigo-200 w-full max-w-3xl px-4 py-2 text-sm md:text-lg focus:border-2 focus:border-indigo-800 focus:outline-none"
        placeholder="Enter the address"
        type="text"
        name="address"
        value={data.address}
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
        placeholder="Enter the password"
        type="text"
        name="password"
        value={data.password}
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
        placeholder="Enter the year of joining"
        type="text"
        name="joinyear"
        value={data.joinyear}
        autoComplete="off"
        onChange={handleChange}
      />
      <button
        className="bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-800 cursor-pointer text-sm md:text-lg rounded-md text-white px-4 py-2 "
        disabled={
          !data.address.trim() ||
          !data.fullname.trim() ||
          !String(data.dob).trim() ||
          !validPwd ||
          !validMob ||
          !validRno ||
          !validEmail ||
          !validYear ||
          !String(data.deptcode).trim()
        }
      >
        Add Student
      </button>
    </form>
  );
}

export default StudentNew;
