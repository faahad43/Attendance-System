import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const AdminDashboard = () => {
  
  return (
    <div className='h-screen w-screen bg-blackPearl'>
        <Navbar/>
        <div className='mt-20 flex flex-col items-center gap-8 text-white'>
                <Link to="/all-students">
                    <div className="flex gap-3 items-center justify-center border rounded p-8 hover:bg-lightgreen">
                    <button className='text-xl'>View All Students</button>
                    </div>
                </Link>
                <Link to="/leave-section">
                    <div className="flex gap-3 items-center justify-center border rounded p-8 hover:bg-lightgreen">
                    <button className='text-xl'>View Leave Section</button>
                    </div>
                </Link>
                
        </div>
       
    </div>
  )
}

export default AdminDashboard