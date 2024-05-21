import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { adminLoginSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import cryptoRandomString from "crypto-random-string";
import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
function AdminLogin() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(() =>
    cryptoRandomString({ length: 6, type: "base64" })
  );
  const [matchCaptcha, setMatchCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.user);

  useEffect(
    function () {
      if (isAuthenticated) {
        if (role === "admin") navigate("/admin/app", { replace: true });
        else if (role === "staff") navigate("/staff/app", { replace: true });
        else if (role === "student")
          navigate("/student/app", { replace: true });
      }
    },
    [isAuthenticated, navigate, role]
  );

  useEffect(
    function () {
      setErrMsg("");
    },
    [password, email, matchCaptcha]
  );

  function changeCaptcha() {
    setCaptcha(cryptoRandomString({ length: 6, type: "base64" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrMsg("");
    if (!password.trim() || !email.trim()) {
      setErrMsg("Please fill all fields!");
      return;
    }
    const validRollno = EMAIL_REGEX.test(email);
    if (!validRollno) {
      setErrMsg("Please enter valid email");
      return;
    }
    const validPassword = PWD_REGEX.test(password);
    if (!validPassword) {
      setErrMsg("Please enter valid password");
      return;
    }

    if (captcha !== matchCaptcha) {
      setErrMsg("Please enter captcha correctly");
      changeCaptcha();
      return;
    }
    const formData = { email, password };
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_BASE_URL}/auth/admin/signin`,
        formData
      );
      if (response.data.success) {
        dispatch(adminLoginSuccess(response.data.data, response.data.token));
      } else {
        setErrMsg(response.data.message);
        changeCaptcha();
      }
    } catch (error) {
      console.log(error);
      changeCaptcha();
      if (error?.response?.data?.message)
        setErrMsg(error?.response?.data?.message);
      else setErrMsg("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cover body bg-top h-full  flex flex-col ">
      <PageNav />
      <motion.h1
        initial={{
          opacity: 0,
          y: "100px",
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          ease: "backInOut",
        }}
        className="text-3xl text-center my-6 font-semibold text-white animate-pulse"
      >
        Admin Login
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
          opacity: 0,
          y: "-100px",
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.5,
          ease: "backInOut",
        }}
        exit={{
          y: "1000px",
        }}
        onSubmit={handleSubmit}
        className="flex flex-col p-8 max-w-lg mx-auto break-all gap-4 rounded-3xl border-2 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] backdrop-blur-lg bg-white/[0.2] shadow-[3px_3px_5px_#ffffff0f] w-[90%] "
      >
        <input
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
            type={isVisible ? "password" : "text"}
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-4 top-2 cursor-pointer text-white"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>
        <div className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]  text-center  tracking-widest text-xl relative">
          <p className="cursor-not-allowed unselectable font-cursive line-through">
            {captcha}
          </p>
          <span
            className="absolute right-4 top-2 cursor-pointer"
            onClick={changeCaptcha}
          >
            <FontAwesomeIcon icon={faRepeat} />
          </span>
        </div>
        <input
          className="w-full mx-auto py-2 px-4 rounded-3xl bg-transparent border border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] focus:border focus:shadow-[0_5px_15px_#ffffff33] focus:outline-none text-white placeholder:text-white/[0.75]"
          type="text"
          name="captcha"
          placeholder="Enter the CAPTCHA"
          required
          value={matchCaptcha}
          onChange={(e) => setMatchCaptcha(e.target.value)}
        />
        <button
          disabled={
            !email.trim() ||
            !password.trim() ||
            !matchCaptcha.trim() ||
            isLoading
              ? true
              : false
          }
          type="submit"
          className="
        rounded-3xl disabled:cursor-not-allowed bg-white/[0.7] px-4 py-2 disabled:bg-slate-500/[0.5] border-2 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] hover:bg-white"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </motion.form>
      <Footer />
    </main>
  );
}

export default AdminLogin;
