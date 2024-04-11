import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faCircleInfo,
  faCheck,
  faTimes,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const { VITE_BASE_URL } = import.meta.env;
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const MOB_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const RNO_REGEX = /^20[\d]{8}$/;

function StudentResgister() {
  const navigate = useNavigate();
  const [rollno, setRollno] = useState("");
  const [rollnoFocus, setRollnoFocus] = useState(false);
  const [validRollno, setValidRollno] = useState(false);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [mobile, setMobile] = useState("");
  const [mobileFocus, setMobileFocus] = useState(false);
  const [validMobile, setValidMobile] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [batch, setBatch] = useState("bat");
  const [gender, setGender] = useState("M");
  const [dob, setDob] = useState("2004-10-22");
  const [deptCode, setDeptCode] = useState("101");
  const [sem, setSem] = useState("1");

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (!rollno) return;
      const res = RNO_REGEX.test(rollno);
      setValidRollno(res);
    },
    [rollno]
  );
  useEffect(
    function () {
      if (!email) return;
      const res = EMAIL_REGEX.test(email);
      setValidEmail(res);
    },
    [email]
  );
  useEffect(
    function () {
      if (!mobile) return;
      const res = MOB_REGEX.test(mobile);
      setValidMobile(res);
    },
    [mobile]
  );
  useEffect(
    function () {
      if (!password) return;
      const res = PWD_REGEX.test(password);
      setValidPassword(res);
    },
    [password]
  );

  useEffect(
    function () {
      setErrMsg("");
    },
    [
      fullName,
      address,
      rollno,
      batch,
      gender,
      deptCode,
      sem,
      dob,
      mobile,
      email,
      password,
    ]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    if (
      !validMobile ||
      !validEmail ||
      !validPassword ||
      !validRollno ||
      !fullName.trim() ||
      !address.trim() ||
      !dob ||
      !batch ||
      !sem ||
      !deptCode ||
      !gender
    ) {
      setErrMsg("Please fill all fields!");
      return;
    }
    const formData = {
      fullName: fullName.trim(),
      address: address.trim(),
      rollno: Number(rollno),
      batch,
      gender,
      deptCode: Number(deptCode),
      sem: Number(sem),
      year: Math.ceil(Number(sem) / 2),
      dob,
      mobile,
      email: email.trim(),
      password: password.trim(),
    };
    try {
      setIsLoading(true);
      console.log(formData);
      const response = await axios.post(
        `${VITE_BASE_URL}/auth/student/signup`,
        formData
      );
      if (response.data.success) {
        navigate("/student/signin");
      } else {
        setErrMsg(response.data.message);
      }
    } catch (error) {
      if (error.response.data.message) setErrMsg(error.response.data.message);
      else setErrMsg("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cover bg-blue bg-top h-full flex flex-col">
      <PageNav />
      <motion.h1
        initial={{
          x: "-1000px",
        }}
        animate={{
          x: 0,
        }}
        transition={{
          duration: 1.5,
          ease: "backInOut",
        }}
        className="text-3xl text-center my-6 font-semibold text-white animate-pulse"
      >
        Student Register
      </motion.h1>
      <AnimatePresence>
        {errMsg && (
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
            {errMsg}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.form
        initial={{
          y: "1000px",
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 1.5,
          ease: "backInOut",
        }}
        exit={{
          y: "-1000px",
        }}
        onSubmit={handleSubmit}
        className="flex flex-col p-8 max-w-lg mx-auto break-all gap-4 rounded-3xl border-2 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] backdrop-blur-lg bg-white/[0.2] shadow-[3px_3px_5px_#ffffff0f] w-[90%] mb-10"
      >
        {/* Full Name */}
        <input
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
          type="text"
          name="fullName"
          placeholder="Name"
          required
          autoComplete="off"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* DoB  */}
        <input
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
          type="date"
          name="dob"
          placeholder="Date of Birth"
          required
          autoComplete="off"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        {/* Gender  */}
        <select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none  text-white "
        >
          <option value="M" className="text-black">
            Male
          </option>
          <option value="F" className="text-black">
            Female
          </option>
        </select>
        {/* Mobile Number  */}
        <div className="relative">
          <input
            className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            required
            autoComplete="off"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onFocus={() => setMobileFocus(true)}
            onBlur={() => setMobileFocus(false)}
          />
          <span className="absolute right-4 top-2">
            {(!validMobile || !mobile) && (
              <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
            )}
            {validMobile && (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "greenyellow" }}
              />
            )}
          </span>
        </div>
        <p
          id="mobilenote"
          className={`w-full rounded-3xl mx-auto text-center font-mono text-white transition-all ${
            mobileFocus && mobile && !validMobile ? "block" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faCircleInfo} style={{ color: "red" }} />{" "}
          Please enter valid mobile number. Format:
          <br />
          9999999999 or +919999999999 or 999-999-9999{" "}
        </p>
        {/* Address */}
        <input
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
          type="text"
          name="address"
          placeholder="Address"
          required
          autoComplete="off"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Roll Number */}
        <div className="relative">
          <input
            className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
            type="text"
            name="rollno"
            placeholder="Roll Number"
            required
            autoComplete="off"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            onFocus={() => setRollnoFocus(true)}
            onBlur={() => setRollnoFocus(false)}
          />
          <span className="absolute right-4 top-2">
            {(!validRollno || !rollno) && (
              <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
            )}
            {validRollno && (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "greenyellow" }}
              />
            )}
          </span>
        </div>

        <p
          id="rollnonote"
          className={`w-full rounded-3xl mx-auto text-center font-mono text-white ${
            rollnoFocus && rollno && !validRollno ? "block" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faCircleInfo} style={{ color: "red" }} />{" "}
          Please enter valid roll number.
          <br />
          Format: 20XXXXXXXX (10 characters)
        </p>
        {/* Department */}
        <select
          name="deptCode"
          value={deptCode}
          onChange={(e) => setDeptCode(e.target.value)}
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none  text-white "
        >
          <option value="101" className="text-black">
            Mechanical Engineering
          </option>
          <option value="102" className="text-black">
            Information Technology
          </option>
          <option value="103" className="text-black">
            Computer Science and Engineering
          </option>
          <option value="104" className="text-black">
            Electrical and Electronics Engineering
          </option>
          <option value="105" className="text-black">
            Electronics and Communication Engineering
          </option>
          <option value="106" className="text-black">
            Civil Engineering
          </option>
        </select>
        {/* Batch  */}
        <select
          name="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none  text-white "
        >
          <option value="A" className="text-black">
            Batch-A
          </option>
          <option value="B" className="text-black">
            Batch-B
          </option>
          <option value="C" className="text-black">
            Batch-C
          </option>
          <option value="E" className="text-black">
            Batch-E
          </option>
          <option value="F" className="text-black">
            Batch-F
          </option>
          <option value="G" className="text-black">
            Batch-G
          </option>
          <option value="H" className="text-black">
            Batch-H
          </option>
          <option value="I" className="text-black">
            Batch-I
          </option>
          <option value="J" className="text-black">
            Batch-J
          </option>
          <option value="K" className="text-black">
            Batch-K
          </option>
          <option value="L" className="text-black">
            Batch-L
          </option>
          <option value="M" className="text-black">
            Batch-M
          </option>
          <option value="N" className="text-black">
            Batch-N
          </option>
        </select>
        {/* Semester */}
        <select
          name="sem"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none  text-white "
        >
          <option value="1" className="text-black">
            1st sem
          </option>
          <option value="2" className="text-black">
            2nd sem
          </option>
          <option value="3" className="text-black">
            3rd sem
          </option>
          <option value="4" className="text-black">
            4th sem
          </option>
          <option value="5" className="text-black">
            5th sem
          </option>
          <option value="6" className="text-black">
            6th sem
          </option>
          <option value="7" className="text-black">
            7th sem
          </option>
          <option value="8" className="text-black">
            8th sem
          </option>
        </select>
        {/* Email Address  */}
        <div className="relative">
          <input
            className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
            type="email"
            name="email"
            placeholder="Email address"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <span className="absolute right-4 top-2">
            {(!validEmail || !email) && (
              <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
            )}
            {validEmail && (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "greenyellow" }}
              />
            )}
          </span>
        </div>
        <p
          id="emailnote"
          className={`w-full rounded-3xl mx-auto text-center font-mono text-white ${
            emailFocus && email && !validEmail ? "block" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faCircleInfo} style={{ color: "red" }} />{" "}
          Please enter valid email address.
          <br />
          Format: example@gmail.com
        </p>
        {/* Password  */}
        <div className="relative">
          <input
            className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <span className="absolute right-4 top-2">
            {(!validPassword || !password) && (
              <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
            )}
            {validPassword && (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "greenyellow" }}
              />
            )}
          </span>
        </div>
        <p
          id="passwordnote"
          className={`w-full rounded-3xl mx-auto text-center font-mono text-white ${
            passwordFocus && password && !validPassword ? "block" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faCircleInfo} style={{ color: "red" }} />{" "}
          Password must contain atleast 8 characters,
          <br /> with one capital letter, one small letter,
          <br /> one symbol and one number.
        </p>
        <button
          disabled={
            !validMobile ||
            !validEmail ||
            !validPassword ||
            !validRollno ||
            !fullName.trim() ||
            !address.trim() ||
            isLoading
              ? true
              : false
          }
          type="submit"
          className="
        rounded-3xl disabled:cursor-not-allowed bg-white/[0.7] px-4 py-2 disabled:bg-slate-500/[0.5] border-2 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] hover:bg-white"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <p>
          <span className="text-white">Already registed ? </span>
          <Link to="/student/signin">
            <span className="text-emerald-400">Sign in</span>
          </Link>
        </p>
      </motion.form>
      <Footer />
    </main>
  );
}

export default StudentResgister;
