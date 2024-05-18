import { useNavigate, useLocation } from 'react-router-dom'
function StaffCourseListItem(props) {
    const navigate = useNavigate();
    const location = useLocation();
    async function handleLiClick(roll, cId, sem, year){
        const data = {
            rollno: props.rollno,
            courseid: props.courseid,
            sem: props.sem,
            year: props.year,
            coursename: props.coursename,
            fullname: props.fullname,
        };
        navigate(location.pathname+"/student", {state: data});
    }
    return (
        
            <li onClick={() => handleLiClick(props.rollno, props.courseid, props.sem, props.year)} className="staff-course-li bg-indigo-300 w-4/5 rounded-lg m-2 p-1 grid grid-rows-12 grid-cols-4 lg:grid-cols-12 lg:grid-rows-8">
                <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-4 px-3 font-bold">Roll No</div>
                <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-8 px-3">{props.rollno}</div>
                <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-4 px-3 font-bold">Name</div>
                <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-8 px-3">{props.fullname}</div>
                <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-4 px-3 font-bold">Dept. Code</div>
                <div className="staff-course-li-div col-span-2 row-span-2 lg:col-span-8 px-3">{props.deptcode}</div>
                <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-4 px-3 font-bold">Course</div>
                <div className="staff-course-li-div col-span-4 row-span-2 lg:col-span-8 px-3">{props.coursename}</div>
                
            </li>
        
    );
}

export default StaffCourseListItem;