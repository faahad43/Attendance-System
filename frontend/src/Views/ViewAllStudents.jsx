import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { IoMdArrowRoundBack } from "react-icons/io";
import useViewStudents from '../hooks/useViewStudents';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const ViewAllStudents = () => {
    const [entries, setEntries] = useState([]);
    const {viewStudents} = useViewStudents();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntries = async () => {
          const fetchedEntries = await viewStudents();
          if(!fetchEntries){
            console.log("Issue while fetching data");
          }else{
            setEntries(fetchedEntries);  
          }
        };
    
        fetchEntries();
      }, [viewStudents]);

    const showStudentAttendance = (username)=>{
        navigate(`/student-attendance/${username}`)
    }

    const renderEntries = () => {
        return entries.map((entry, index) => (
          <tr className='text-center' key={index}>
            <td className='border-2 py-2'>{index + 1}</td>
            <td className='border-2 py-2'>{entry.name}</td>
            <td className='border-2 py-2'><Button className="bg-darkYellow text-base w-18 py-1.5 ml-[calc(50%-2.25rem)] mb-1 mt-1" name="View" onClick={()=>showStudentAttendance(entry.username)} /></td>
          </tr>
        ));
    };

  return (
    <div className='h-screen w-screen bg-blackPearl'>
      <Navbar title="Back" path='/admin-Dashboard' icon={<IoMdArrowRoundBack />} />
      <div className='my-[2rem] overflow-y-scroll h-[calc(100%-6rem)]'>
        <h4 className='text-center text-green text-xl font-semibold'>Attendance Of All Students</h4>
        <table className='text-white border-2 w-[calc(100%-2rem)] mx-[1rem] my-[2rem] table-fixed'>
          <thead>
            <tr>
              <th className='border-2 w-[15%] py-2'>S.no</th>
              <th className='border-2 w-[55%] py-2'>Name</th>
              <th className='border-2 w-[30%] py-2'>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {renderEntries()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewAllStudents