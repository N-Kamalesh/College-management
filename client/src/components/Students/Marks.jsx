import React from 'react'

export default function Marks() {
  return (
    <main className='w-full min-h-screen text-center '>
      
      <div className='  text-center m-10 p-2'>
        <h1 className='text-black-100 text-4xl font-serif'>ATTENDANCE AND MARKS</h1>
      </div>

     <div className='float-right text-black-100    rounded-full flex justify-center items-center p-3 text-black-100 mr-20 mb-20' >
        
        <form>
           
            <select>
             <option value="sem1">Sem 1</option>
             <option value="sem2">Sem 2</option>
             <option value="sem3">Sem 3</option>
             <option value="sem4">Sem 4</option>
            </select>
        </form>
        
     </div>

    <div className=' m-20 mt-30   text-center'>
      <table className='shadow-2xl  border-2 border-cyan-400  w-full'>

        <thead className='text-white'>
          <tr>
            <th className='py-3 bg-cyan-800'>Course id</th>
            <th className='py-3 bg-cyan-800'>Course Name</th>
            <th className='py-3 bg-cyan-800'>Attendance</th>
            <th className='py-3 bg-cyan-800'>Internals</th>
            <th className='py-3 bg-cyan-800'>Externals</th>
            <th className='py-3 bg-cyan-800'>Total</th>
            <th className='py-3 bg-cyan-800'>Grade</th>
          </tr>
        </thead>
        <tbody className='text-black text-centre'>

          <tr className='bg-cyan-900  hover:bg-cyan-100 cursor-pointer duration-300'>
          <td className='py-3 px-6'>1</td>
          <td className='py-3 px-6'>2</td>
          <td className='py-3 px-6'>3</td>
          <td className='py-3 px-6'>4</td>
          <td className='py-3 px-6'>5</td>
          <td className='py-3 px-6'>6</td>
          <td className='py-3 px-6'>7</td>
          </tr>

          <tr className='bg-cyan-900 hover:bg-cyan-100 cursor-pointer duration-300'>
          <td className='py-3 px-6'>1</td>
          <td className='py-3 px-6'>2</td>
          <td className='py-3 px-6'>3</td>
          <td className='py-3 px-6'>4</td>
          <td className='py-3 px-6'>5</td>
          <td className='py-3 px-6'>6</td>
          <td className='py-3 px-6'>7</td>
          </tr>

          <tr className='bg-cyan-900 hover:bg-cyan-100 cursor-pointer duration-300'>
          <td className='py-3 px-6'>1</td>
          <td className='py-3 px-6'>2</td>
          <td className='py-3 px-6'>3</td>
          <td className='py-3 px-6'>4</td>
          <td className='py-3 px-6'>5</td>
          <td className='py-3 px-6'>6</td>
          <td className='py-3 px-6'>7</td>
          </tr>

          <tr className='bg-cyan-900 hover:bg-cyan-100 cursor-pointer duration-300'>
          <td className='py-3 px-6'>1</td>
          <td className='py-3 px-6'>2</td>
          <td className='py-3 px-6'>3</td>
          <td className='py-3 px-6'>4</td>
          <td className='py-3 px-6'>5</td>
          <td className='py-3 px-6'>6</td>
          <td className='py-3 px-6'>7</td>
          </tr>

          <tr className='bg-cyan-900 hover:bg-cyan-100 cursor-pointer duration-300'>
          <td className='py-3 px-6'>1</td>
          <td className='py-3 px-6'>2</td>
          <td className='py-3 px-6'>3</td>
          <td className='py-3 px-6'>4</td>
          <td className='py-3 px-6'>5</td>
          <td className='py-3 px-6'>6</td>
          <td className='py-3 px-6'>7</td>
          </tr>

          <tr className='bg-cyan-900 hover:bg-cyan-100 cursor-pointer duration-300'>
          <td className='py-3 px-6'>1</td>
          <td className='py-3 px-6'>2</td>
          <td className='py-3 px-6'>3</td>
          <td className='py-3 px-6'>4</td>
          <td className='py-3 px-6'>5</td>
          <td className='py-3 px-6'>6</td>
          <td className='py-3 px-6'>7</td>
          </tr>

          <tr className='bg-cyan-900 hover:bg-cyan-100 cursor-pointer duration-300'>
          <td className='py-3 px-6'>1</td>
          <td className='py-3 px-6'>2</td>
          <td className='py-3 px-6'>3</td>
          <td className='py-3 px-6'>4</td>
          <td className='py-3 px-6'>5</td>
          <td className='py-3 px-6'>6</td>
          <td className='py-3 px-6'>7</td>
          </tr>

          
        </tbody>
      </table>
      
        </div>
        <div className='bg-white mt-20 mr-20 ml-20 mb-10 flex justify-center items-center'>
          <table className='shadow-3xl bg-cyan-200 border-2 border-cyan-400 text-white w-full'>
            <thead>
              <tr>
                <th className='py-3 bg-cyan-800'>Current CGPA</th>
                <th className='bg-cyan-800'>9.8</th>
              </tr>
            </thead>
          </table>
        </div>
      
   
    </main>
  )
}
