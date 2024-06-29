import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuthContext } from '../context/authContext';
import useViewAttendance from '../hooks/useViewAttendance';

const ViewAttendance = () => {
  const { viewAttendance } = useViewAttendance();
  const [entries, setEntries] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await viewAttendance();
      setEntries(fetchedEntries);
    };

    fetchEntries();
  }, [viewAttendance]);

  const renderEntries = () => {
    return entries.map((entry, index) => (
      <tr className='text-center' key={index}>
        <td className='border-2'>{index + 1}</td>
        <td className='border-2'>{new Date(entry.createdAt).toLocaleDateString()}</td>
        <td className='border-2'>{entry.attendanceStatus}</td>
      </tr>
    ));
  };

  return (
    <div className='h-screen w-screen bg-blackPearl'>
      <Navbar title="Back" icon={<IoMdArrowRoundBack />} />
      <div className='my-[2rem] overflow-y-scroll h-[calc(100%-6rem)] flex flex-col items-center'>
        <h4 className='text-center text-white font-semibold'>Name :<span className='ml-4'>{authUser.name}</span></h4>
        <table className='text-white border-2 w-[calc(100%-2rem)] mx-[1rem] my-[2rem] table-fixed max-w-[1000px]'>
          <thead>
            <tr>
              <th className='border-2 w-[20%]'>S.no</th>
              <th className='border-2 w-[40%]'>Date</th>
              <th className='border-2 w-[40%]'>Attendance</th>
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

export default ViewAttendance;
