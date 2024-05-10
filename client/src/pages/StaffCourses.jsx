import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import StaffCourseButton from "../components/StaffCourse/StaffCourseButton";
import StaffCourseListItem from "../components/StaffCourse/StaffCourseListItem";
import axios from 'axios';
const { VITE_BASE_URL } = import.meta.env;

function StaffCourses(){
    const [courses, setCourses] = useState(
        [
            {
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
            },
        ]
    );
    const [students, setStudents] = useState(
        [
            {
                'rollno':2000,
                'fullname': "buddy",
                'deptcode': 200,
                'coursename': 'computer science'
            },
            {
                'rollno':2001,
                'fullname': "guy",
                'deptcode': 200,
                'coursename': 'dbms'
            },
            {
                'rollno':2002,
                'fullname': "person",
                'deptcode': 202,
                'coursename': 'data structures'
            },
            {
                'rollno':2003,
                'fullname': "another person",
                'deptcode': 203,
                'coursename': 'data structures'
            },
            {
                'rollno':2004,
                'fullname': "buddy",
                'deptcode': 200,
                'coursename': 'computer science'
            },
        ]
    );
    const [isView, setIsView] = useState(false);
    const { token, user } = useSelector((state) => state.user);

    useEffect(
        function () {
            async function getStaffCourses(){
                try {
                    const staffid = user.staffid;
                    const response = await axios.get(`${VITE_BASE_URL}/staff/courses`);
                    setCourses(response);
                } catch (error) {
                    console.log("Error in getting staff courses!");
                }
            }
            async function createView(){
                try {
                    axios.post(`${VITE_BASE_URL}/staff/courses/${staffid}`);
                    setIsView(true);
                    setStudents(response);
                } catch (error) {
                    console.log("Error in creating view!");
                    setIsView(false);
                }
            }
            createView();
            isView ? getStaffCourses() : console.log("Server issue creating a view!");
        },
        [isView, courses]
    );
    useEffect(
        function () {
            async function getAllStudents(){
                try {
                    const response = await axios.get(`${VITE_BASE_URL}/staff/courses/all`);
                    setStudents(response);
                } catch (error) {
                    console.log("Error in getAllStudents");
                }
            }
            getAllStudents();
        },
        [students]
    );
    async function getStudents(e){
        try {
            const courseid = e.target.id;
            const staffid = user.staffid;
            const response = await axios.get(`${VITE_BASE_URL}/staff/courses?id=${staffid}&c_id=${courseid}`);
            setStudents(response);
        } catch (error) {
            console.log("Error in getStudents!");
        }
    }
    return (
        <div className="staff-course-outer w-screen">
            <div className="staff-course-button-container mt-16 flex justify-center items-center flex-wrap gap-3">
                {courses.map(
                    (item) => <StaffCourseButton key={item.courseid} id={item.courseid} text={item.coursename} onClickHandler={getStudents} />
                )}
            </div>
            <ul className="staff-course-ul h-auto flex justify-center flex-col items-center my-20">
                {students.map(
                    (item, index) => <StaffCourseListItem key={index} rollno={item.rollno} fullname={item.fullname} deptcode={item.deptcode} coursename ={item.coursename} />
                )}
            </ul>

        </div>
    );
}

export default StaffCourses;