import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import student from "../assets/graduated.png";
import professor from "../assets/professor.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";

function Homepage() {
  const slides = [img1, img2, img3, img4];

  return (
    <main className="bg-ball min-h-screen  bg-cover flex flex-col ">
      <PageNav />
      <section className=" w-full sm:w-4/5 mx-auto mt-0 sm:mt-12 mb-10 sm:mb-14 max-w-4xl">
        <Carousel slides={slides} />
      </section>
      <motion.section
        initial={{
          y: 1000,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 2,
          ease: "backInOut",
        }}
        className="flex flex-col gap-10 sm:gap-0 sm:flex-row justify-around p-10 max-w-4xl w-4/5 mx-auto border-2 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] backdrop-blur-lg bg-white/[0.2] shadow-[3px_3px_5px_#ffffff0f]  rounded-3xl mt-5 mb-20"
      >
        <div>
          <motion.img
            initial={{
              y: 0,
            }}
            animate={{
              y: -20,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="size-48 bg-white rounded-full border-4 border-blue-400 mx-auto hover:saturate-200"
            src={student}
            alt="student"
          />
          <Link to="/student/signin">
            <p className="text-center mt-4 bg-white py-2 px-6 rounded-lg hover:bg-emerald-400 active:bg-emerald-700">
              Student
            </p>
          </Link>
        </div>
        <div>
          <motion.img
            initial={{
              y: 0,
            }}
            animate={{
              y: -20,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="size-48 bg-white rounded-full border-4 border-blue-400 mx-auto hover:saturate-200"
            src={professor}
            alt="professor"
          />
          <Link to="/staff/signin">
            <p className="text-center mt-4 bg-white py-2 px-6 rounded-lg hover:bg-emerald-400 active:bg-emerald-700">
              Staff
            </p>
          </Link>
        </div>
      </motion.section>
      <Footer />
    </main>
  );
}

export default Homepage;
