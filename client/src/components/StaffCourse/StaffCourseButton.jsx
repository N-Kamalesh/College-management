function StaffCourseButton(props) {
    return (
        <button id={props.id} onClick={(e) => props.onClickHandler(e)} className="staff-course-button bg-sky-200 p-3 rounded-xl w-32 mx-16">{props.text}</button>
    );
}

export default StaffCourseButton;