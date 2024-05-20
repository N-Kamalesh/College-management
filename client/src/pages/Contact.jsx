import PageNav from "../components/PageNav";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import contact from "../assets/contact.jpg";
import "leaflet/dist/leaflet.css";
import Footer from "../components/Footer";

function Contact() {
  const position = [13.011, 80.2354];
  return (
    <main className="body bg-cover min-h-screen flex flex-col">
      <PageNav />
      <section className="flex flex-col md:flex-row mt-12 max-w-7xl w-full mx-auto justify-around items-center">
        <motion.img
          initial={{
            rotate: "0deg",
            scale: 0,
          }}
          animate={{
            rotate: "360deg",
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "backInOut",
          }}
          src={contact}
          alt="contact"
          className="size-64 rounded-full  border-4 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33]"
        />
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "backInOut",
          }}
          className=" border-2 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] backdrop-blur-lg bg-white/[0.2] shadow-[3px_3px_5px_#ffffff0f] p-6 rounded-3xl mt-10 md:mt-0  md:w-auto w-72 sm:w-4/5 "
        >
          <h2 className="md:text-xl xl:text-3xl text-lg  text-white capitalize text-center font-semibold">
            Do you have any queries or do you face any problems?
          </h2>
          <h1 className="text-center mt-5 md:text-2xl xl:text-4xl text-xl text-white font-semibold">
            <span className="md:text-4xl xl:text-5xl text-2xl text-emerald-400 font-bold">
              Contact Us{" "}
            </span>
            and get all your answers
          </h1>
        </motion.div>
      </section>
      <section className="flex flex-col md:flex-row w-full justify-evenly items-center my-10 md:my-20 ">
        <motion.div
          initial={{
            opacity: 0,
            y: "100px",
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 1.5,
            ease: "backInOut",
          }}
          className="md:h-[350px] h-64 w-72 sm:h-72 sm:w-4/5 md:w-[55%] border-4 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] rounded-3xl"
        >
          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            className="h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              className="rounded-sm"
            />
            <Marker position={position}>
              <Popup>Anna University</Popup>
            </Marker>
          </MapContainer>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: "100px",
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 1.5,
            ease: "backInOut",
          }}
          className="border-2 border-[#ffffff80] border-r-[#ffffff33] border-b-[#ffffff33] backdrop-blur-lg bg-white/[0.2] shadow-[3px_3px_5px_#ffffff0f] p-6 rounded-3xl flex flex-col text-center justify-evenly mt-10 md:mt-0 text-white min-h-64 md:h-[350px] "
        >
          <h3 className="font-bold text-2xl md:text-3xl">
            Email <FontAwesomeIcon icon={faEnvelope} />
          </h3>
          <p className="font-semibold md:text-lg text-md">
            collegequeries@gmail.com
          </p>
          <h3 className="font-bold text-2xl md:text-3xl">
            Phone <FontAwesomeIcon icon={faPhone} />
          </h3>
          <p className="font-semibold md:text-lg text-md">044 783 827323</p>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}

export default Contact;
