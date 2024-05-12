import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import StaffCourseButton from "../components/StaffCourse/StaffCourseButton";
import StaffCourseListItem from "../components/StaffCourse/StaffCourseListItem";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Spinner from '../components/Spinner';
import axios from 'axios';
const { VITE_BASE_URL } = import.meta.env;

function StaffCourses(){
    const [courses, setCourses] = useState([{}]);
    const [students, setStudents] = useState([{}]);
    const [isView, setIsView] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token, user } = useSelector((state) => state.user);

    useEffect(
        function () {
            async function getStaffCourses(){
                try {
                    setIsLoading(true);
                    const response = await axios.get(`${VITE_BASE_URL}/staff/courses/course`);
                    setCourses(response.data.data);
                } catch (error) {
                    console.log("Error in getting staff courses!");
                } finally {
                    setIsLoading(false);
                }
            }
            async function createView(){
                try {
                    setIsLoading(true);
                    await axios.get(`${VITE_BASE_URL}/staff/courses/create?staffid=${user.staffid}`);
                    setIsView(true);
                } catch (error) {
                    console.log("Error in creating view!",error);
                    setIsView(false);
                } finally {
                    setIsLoading(false);
                }
            }
            createView();
            getStaffCourses();
        },
        [students]
    );
    useEffect(
        function () {
            async function getAllStudents(){
                try {
                    setIsLoading(true);
                    const response = await axios.get(`${VITE_BASE_URL}/staff/courses/all`);
                    setStudents(response.data.data);
                } catch (error) {
                    console.log("Error in getAllStudents");
                } finally {
                    setIsLoading(false);
                }
            }
            getAllStudents();
        },
        []
    );
    async function getStudents(e){
        try {
            setIsLoading(true);
            const courseid = e.target.id;
            setFalseButton(e.target.id); //remove selected class from all buttons and add the class to the selected button
            const response = await axios.get(`${VITE_BASE_URL}/staff/courses?c_id=${courseid}`);
            setStudents(response.data.data);
        } catch (error) {
            console.log("Error in getStudents!");
        } finally {
            setIsLoading(false);
        }
    }
    function setFalseButton(e){
        for(let i = 0 ; i<courses.length; i++){
            document.getElementById(courses[i].courseid).classList.remove("selected-button");
        }
        document.getElementById(e).classList.add("selected-button");
    }
    if (isLoading) return (
        <div className="staff-course-outer w-screen"><Spinner /></div>)
    else return(
        <div className="staff-course-outer w-screen">
        <AnimatePresence>
        {(
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
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: "white" }}
            />
          </motion.p>
        )}
      </AnimatePresence>
            <div className="staff-course-button-container mt-16 flex justify-around items-center flex-wrap gap-3 text-sm">
                {courses.map(
                    (item) => <StaffCourseButton key={item.courseid} staffid={user.staffid} id={item.courseid} text={item.coursename} onClickHandler={getStudents} />
                )}
            </div>
            <ul className="staff-course-ul h-[80vh] flex flex-col items-center my-20 overflow-auto">
                {students.map(
                    (item, index) => <StaffCourseListItem key={index} rollno={item.rollno} fullname={item.fullname} deptcode={item.deptcode} coursename ={item.coursename} />
                )}
            </ul>

        </div>
    );
}

export default StaffCourses;

/*{
                'courseid': 100,
                'coursename': 'CompSci',
            },
            {
                'courseid': 101,
                'coursename': 'InfoSci',
            },
            {
                'courseid': 102,
                'coursename': 'EnvSci',
            },
            {
                'courseid': 103,
                'coursename': 'HumSci',
            }, */