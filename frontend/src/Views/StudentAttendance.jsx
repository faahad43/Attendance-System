import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from 'react-router-dom'
import useStudentAttendance from '../hooks/useStudentAttendace';
import Button from '../Components/Button';
import useChangeAttendance from '../hooks/useChangeAttendance';
import toast from 'react-hot-toast';
import useMarkAttendance from '../hooks/useMarkAttendance';

const StudentAttendance = () => {
  const {username} = useParams();
  const [entries, setEntries] = useState([]);
  const {studentAttendance} = useStudentAttendance();
  const {changeAttendance} = useChangeAttendance();
  const {markAttendance} = useMarkAttendance();
  const [name,setName] = useState('');
  const [UserId,setUserId] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await studentAttendance(username);
      if(fetchedEntries[0]){
        setEntries(fetchedEntries[0]);
        setName(fetchedEntries[1]);
        setUserId(fetchedEntries[0][0].userAttendance);
      }  
    };

    fetchEntries();
  }, [studentAttendance])

  const markPresent = (userId,date,preStatus) => {
    changeAttendance({userId,date,preStatus,newStatus:'present'});
  }

  const markAbsent = (userId,date,preStatus) => {
    changeAttendance({userId,date,preStatus,newStatus:'absent'});
  }

  const handleAttendance =async (userId)=>{
    const lastAttendaceClicked = localStorage.getItem(`lastAttendaceClicked${username}`);
     
    const today = new Date().toLocaleDateString();
      
    if(lastAttendaceClicked === today){
        toast.error("Attendance can be marked only once a day.");
    }else{
      localStorage.setItem(`lastAttendaceClicked${username}`,today);
      const success=await markAttendance(userId);
      if(success){
      toast.success("Attendance Marked");
      }else{
        toast.error("Error while marking attendance");
      }
    }
  
  }

  const renderEntries = () => {
    return entries.map((entry, index) => (
      <tr className='text-center' key={index}>
        <td className='border-2 w-[12.5%] py-2 h'>{index + 1}</td>
        <td className='border-2 w-[27.5%]'>{new Date(entry.createdAt).toLocaleDateString()}</td>
        <td className='border-2 w-[21.5%]'>{entry.attendanceStatus}</td>
        <td className='border-2 w-[20%]'><div onClick={()=>markPresent(entry.userAttendance,entry.createdAt,entry.attendanceStatus)}><Button name="P" className="bg-green rounded-sm py-1 px-4 mt-[calc(50%-1.5rem)] md:mt-3 ml-[calc(50%-1.5rem)] text-base"/></div></td>
        <td className='border-2 w-[20%]'><div onClick={()=>markAbsent(entry.userAttendance,entry.createdAt,entry.attendanceStatus)}><Button name="A" className="bg-red-500 rounded-sm py-1 px-4 mt-[calc(50%-1.5rem)] md:mt-3 ml-[calc(50%-1.5rem)] text-base"/></div></td>
      </tr>
    ));
  };
  
  return (
    <div className='h-screen w-screen bg-blackPearl'>
      <Navbar title="Back" path='/all-students' icon={<IoMdArrowRoundBack />} />
      <div className='my-[2rem] overflow-y-scroll h-[calc(100%-6rem)] flex flex-col items-center'>
        <h4 className='text-center text-white font-semibold'>{`Name :  ${name}`}<span className='ml-4'></span></h4>
        <div className='flex justify-center mt-5'>
        <button className='items-center justify-center border rounded p-8 hover:bg-lightgreen text-xl text-white' onClick={()=>handleAttendance(UserId)}>Mark Attendance</button>
        </div>

        <table className='text-white border-2 w-[calc(100%-2rem)] mx-[1rem] my-[2rem] table-fixed max-w-[1000px]'>
          <thead>
            <tr>
              <th className='border-2 w-[12.5%] py-1'>S.no</th>
              <th className='border-2 w-[27.5%]'>Date</th>
              <th className='border-2 w-[20%]'>Status</th>
              <th className='border-2 w-[20%]'>Present</th>
              <th className='border-2 w-[20%]'>Absent</th>
            </tr>
          </thead>
          <tbody>
            {renderEntries()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentAttendance