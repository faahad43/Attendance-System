import React from 'react'
import { PiStudentDuotone } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='h-screen w-screen bg-blackPearl text-white'>
        <div className='top-[calc(50%-19rem)] left-[calc(50%-8rem)] absolute flex flex-col  items-center'>
            <h1 className='text-3xl  w-[16rem] text-center leading-relaxed'>Welcome To Attendance System</h1>
            <div className='mt-20 flex flex-col gap-8'>
                <Link to="/login">
                    <div className="flex gap-3 items-center justify-center border rounded p-8 hover:bg-lightgreen">
                        <PiStudentDuotone size={35} /><h4 className='text-xl'>Student Login</h4>
                    </div>
                </Link>
                <Link to="/admin-login">
                    <div className="flex gap-3 items-center justify-center border rounded p-8 hover:bg-lightgreen">
                        <MdAdminPanelSettings size={35} /><h4 className='text-xl'>Admin Login</h4>
                    </div>
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default Home