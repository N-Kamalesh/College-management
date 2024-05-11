function FlipCard(){
    return (
        <div class="card-container min-w-[180px] min-h-[280px] bg-indigo-300 h-50 rounded-3xl mx-6 flex flex-col  justify-center hover:scale-105 transition delay-200">
            <div class="card-content">
                <div class="card-front flex flex-col items-center">
                    <h6 className="card-front-course-title text-center m-0 mb-1 p-0 font-bold">Course Title</h6>
                    <p className="card-front-course-deptcode p-0 m-0"><span className="font-bold">Dept Code: </span>103</p>
                </div>
                <div class="card-back flex flex-col items-center">
                    <h6 className="card-front-course-instructor text-center m-0 mb-1 p-0 font-bold">Instructor</h6>
                    <p className="card-front-course-designation p-3 m-0"><span className="font-bold">Designation: </span>phd in something...</p>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;