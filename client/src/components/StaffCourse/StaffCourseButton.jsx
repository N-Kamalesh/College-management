function StaffCourseButton(props) {
    
    return (
        <button id={props.id} onClick={(e) => props.onClickHandler(e)} className="staff-course-button bg-sky-200 p-2 rounded-xl w-40 h-32 mx-8">{props.text}</button>
    );
}

export default StaffCourseButton;