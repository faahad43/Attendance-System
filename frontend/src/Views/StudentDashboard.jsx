import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import Home from './Home'
import toast from "react-hot-toast"
import useMarkAttendance from '../hooks/useMarkAttendance'
import Modal from '../Components/Modal'
import { useAuthContext } from '../context/authContext'




const StudentDashboard = () => {

  const {markAttendance} = useMarkAttendance();
  const [isDisabled, setIsDisabled] = useState(true);
  const [leaveCaution,setLeaveCaution] = useState('');
  const {authUser} = useAuthContext();
  

  useEffect(() => {
    const lastAttendaceClicked = localStorage.getItem(`lastAttendaceClicked${authUser.username}`);
    const today = new Date().toLocaleDateString();
    
    if (lastAttendaceClicked === today) {
      setLeaveCaution("Note: You have already marked attendance. Sending Leave will change your attendance Status.");
    }
  }, [authUser.username]);

  const lastAttendaceClicked = localStorage.getItem(`lastAttendaceClicked${authUser.username}`);

     
  const today = new Date().toLocaleDateString();
  
    const handleAttendance =async ()=>{
      
      if(lastAttendaceClicked === today){
          toast.error("Attendance can be marked only once a day.");
      }else{
        localStorage.setItem(`lastAttendaceClicked${authUser.username}`,today);
        const success=await markAttendance();
        if(success){
        toast.success("Attendance Marked");
        }else{
          toast.error("Error while marking attendance");
        }
      }
    
    }

    const handleLeave = ()=>{
      setIsDisabled(!isDisabled);
      console.log(isDisabled);
    }
    const handleModalDataFromChild =(data)=>{
      setIsDisabled(data);
    }
   
   

  return (
    <div className='h-screen w-screen bg-blackPearl'>
        <Navbar/>
        <div className='mt-20 flex flex-col items-center gap-8 text-white'>

                <button className='items-center justify-center border rounded p-8 hover:bg-lightgreen text-xl' onClick={handleAttendance}>Mark Attendance</button>
                <Link to="/view-attendance">
                    <div className="flex gap-3 items-center justify-center border rounded p-8 hover:bg-lightgreen">
                    <button className='text-xl'>View Attendance</button>
                    </div>
                </Link>
                  
                <button className='items-center justify-center border rounded p-8 hover:bg-lightgreen text-xl' onClick={handleLeave}>Request For Leave</button>
                
                  {!isDisabled ? <Modal sendModalDataToParent={handleModalDataFromChild} note={leaveCaution} status={isDisabled}/>: ''}
                
        </div>
       
    </div>
  )
}

export default StudentDashboard