import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useState } from "react";

Carousel.propTypes = {
  slides: PropTypes.array,
};
function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  function prevSlide() {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent((curr) => curr - 1);
  }
  function nextSlide() {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent((curr) => curr + 1);
  }
  return (
    <div className="overflow-hidden relative sm:shadow-[5px_5px_5px_#002] sm:rounded-3xl">
      <div
        className="flex h-96 sm:h-auto transition-all ease-in-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((img, index) => (
          <img key={"image" + index} src={img} className="bg-contain" />
        ))}
      </div>

      <div className="absolute top-0 w-full h-full flex justify-between p-2 sm:p-6 items-center text-white text-3xl z-40">
        <button
          className="hover:text-blue-400 active:scale-125"
          onClick={prevSlide}
        >
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </button>
        <button
          className="hover:text-blue-400 active:scale-125"
          onClick={nextSlide}
        >
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </button>
      </div>
      <div className="absolute top-0 w-full h-full flex-col flex gap-4 justify-center items-center  bg-black/[0.6]">
        <motion.h3
          initial={{
            y: 100,
            opacity: "0%",
          }}
          animate={{
            y: 0,
            opacity: "100%",
          }}
          transition={{
            duration: 1.2,
            ease: "backInOut",
          }}
          className="text-2xl sm:text-4xl text-white font-bold text-center w-3/5"
        >
          Welcome to College DB
        </motion.h3>
        <motion.hr
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "backInOut" }}
          className="w-1/2 bg-white h-[2px]"
        />
        <motion.p
          initial={{ x: -300, opacity: "0%" }}
          animate={{ x: 0, opacity: "100%" }}
          transition={{ delay: 1, duration: 1.5, ease: "backInOut" }}
          className="text-lg sm:text-2xl text-white font-medium text-center w-3/5"
        >
          Get all your info here
        </motion.p>
      </div>
      <div className="absolute bottom-0 py-6 flex justify-center w-full gap-3 cursor-pointer z-40">
        {slides.map((img, index) => (
          <span
            key={"ball" + index}
            onClick={() => setCurrent(index)}
            className={`rounded-full size-3 sm:size-5  ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
