function FlipCard(props){
    return (
        <div className="card-container min-w-[180px] max-h-[280px] min-h-[280px]  rounded-3xl mx-6 hover:scale-105 transition delay-200">
            <div className="card-content max-h-[260px] min-h-[260px] bg-indigo-800 rounded-lg">
                <div className="card-front flex flex-col items-center w-full top-[80px]">
                    <h6 className="card-front-course-title text-center m-0 mb-1 p-0 font-bold">{props.coursename}</h6>
                    <p className="card-front-course-deptcode p-0 m-0"><span className="font-bold">Dept Code: </span>{props.deptcode}</p>
                </div>
                <div className="card-back flex flex-col items-center w-full top-[80px]">
                    <h6 className="card-back-course-instructor text-center m-0 mb-1 p-0 font-bold">{props.fullname}</h6>
                    <p className="card-back-course-designation p-3 m-0 text-sm">{props.designation}</p>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;