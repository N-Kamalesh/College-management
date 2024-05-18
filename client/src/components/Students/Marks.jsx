export default function Marks() {
  return (
    <main className="w-full min-h-screen text-center ">
      <h1 className="text-center pt-5 text-3xl text-indigo-800 font-bold">
        Attendance & Marks
      </h1>

      <div className=" text-white   rounded-full flex justify-center items-center p-3  m-20 mb-20">
        <form>
          <select className="bg-indigo-800 float-right border-2  border-indigo-400">
            <option value="sem1">Sem 1</option>
            <option value="sem2">Sem 2</option>
            <option value="sem3">Sem 3</option>
            <option value="sem4">Sem 4</option>
          </select>
        </form>
      </div>

      <div className=" m-20 mt-30  text-center  flex justify-center items-center overflow-x-auto ">
        <table className="shadow-2xl  border-2  border-indigo-400   w-full">
          <thead className="text-white   overflow-x-auto">
            <tr>
              <th className="py-3 bg-indigo-900 ">Course id</th>
              <th className="py-3 bg-indigo-900 ">Course Name</th>
              <th className="py-3 bg-indigo-900 ">Attendance</th>
              <th className="py-3 bg-indigo-900 ">Internals</th>
              <th className="py-3 bg-indigo-900 ">Externals</th>
              <th className="py-3 bg-indigo-900 ">Total</th>
              <th className="py-3 bg-indigo-900 ">Grade</th>
            </tr>
          </thead>
          <tbody className="text-white text-centre">
            <tr className="bg-indigo-800  hover:border-2 border-cyan-100  cursor-pointer duration-300">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">database</td>
              <td className="py-3 px-6">3</td>
              <td className="py-3 px-6">4</td>
              <td className="py-3 px-6">5</td>
              <td className="py-3 px-6">6</td>
              <td className="py-3 px-6">7</td>
            </tr>

            <tr className="bg-indigo-800 hover:border-2 border-cyan-100 cursor-pointer duration-300">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">database</td>
              <td className="py-3 px-6">3</td>
              <td className="py-3 px-6">4</td>
              <td className="py-3 px-6">5</td>
              <td className="py-3 px-6">6</td>
              <td className="py-3 px-6">7</td>
            </tr>

            <tr className="bg-indigo-800 hover:border-2 border-cyan-100 cursor-pointer duration-300">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">database</td>
              <td className="py-3 px-6">3</td>
              <td className="py-3 px-6">4</td>
              <td className="py-3 px-6">5</td>
              <td className="py-3 px-6">6</td>
              <td className="py-3 px-6">7</td>
            </tr>

            <tr className="bg-indigo-800 hover:border-2 border-cyan-100 cursor-pointer duration-300">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">2</td>
              <td className="py-3 px-6">3</td>
              <td className="py-3 px-6">4</td>
              <td className="py-3 px-6">5</td>
              <td className="py-3 px-6">6</td>
              <td className="py-3 px-6">7</td>
            </tr>

            <tr className="bg-indigo-800 hover:border-2 border-cyan-100 cursor-pointer duration-300">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">database</td>
              <td className="py-3 px-6">3</td>
              <td className="py-3 px-6">4</td>
              <td className="py-3 px-6">5</td>
              <td className="py-3 px-6">6</td>
              <td className="py-3 px-6">7</td>
            </tr>

            <tr className="bg-indigo-800 hover:border-2 border-cyan-100 cursor-pointer duration-300">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">database</td>
              <td className="py-3 px-6">3</td>
              <td className="py-3 px-6">4</td>
              <td className="py-3 px-6">5</td>
              <td className="py-3 px-6">6</td>
              <td className="py-3 px-6">7</td>
            </tr>

            <tr className="bg-indigo-800 hover:border-2 border-cyan-100 cursor-pointer duration-300">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">database</td>
              <td className="py-3 px-6">3</td>
              <td className="py-3 px-6">4</td>
              <td className="py-3 px-6">5</td>
              <td className="py-3 px-6">6</td>
              <td className="py-3 px-6">7</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white mt-20 mr-40 ml-40 mb-10 flex justify-center items-center">
        <table className="shadow-3xl bg-cyan-200 border-2 border-indigo-400 text-white w-full">
          <thead>
            <tr>
              <th className="py-3 bg-indigo-900">Current CGPA</th>
              <th className="bg-indigo-900">9.8</th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  );
}
