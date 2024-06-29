import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { IoMdArrowRoundBack } from "react-icons/io";
import Button from '../Components/Button';
import useViewleave from '../hooks/useViewLeave';
import Modal from '../Components/Modal';

const LeaveSection = () => {
  const {viewLeave} = useViewleave();
  const [entries,setEntries] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalVisibility, setModalVisibility] = useState({});
  
  useEffect(()=>{
    const fetchEntries = async() =>{
      const fetchedEntries = await viewLeave();
      setEntries(fetchedEntries)
    }

    fetchEntries();

  },[viewLeave])

  const handleModalDataFromChild =(data)=>{
    setIsDisabled(data);
  }

  const handleLeave = ()=>{
    
    console.log(isDisabled);
  }

  const handleViewClick = (index) => {
    setIsDisabled(!isDisabled);
    setModalVisibility(prevState => ({
      ...prevState,
      [index]: !prevState[index] // Toggle visibility state for the specific entry
    }));
  };

  const renderEntries = () =>{
    return entries.map((entry,index)=>(
        <div className='border-2 rounded w-[calc(100%-2rem)] h-32 py-2 px-4 text-white max-w-[800px]'>
            <h4 className='text-xl font-semibold'>{entry.userDetails.name}</h4>
            <p className='pt-2 text-lg'>{entry.subject}</p>
            <div className='flex justify-between'>
            <p className='pt-2'>Date: {new Date(entry.createdAt).toLocaleDateString()}</p>
            <Button name="View" className="bg-green rounded-sm text-lg py-1 px-1" onClick={() => handleViewClick(index)}/>

            {modalVisibility[index] && (
            <Modal sendModalDataToParent={handleModalDataFromChild} note=''  SubDisable={true} descDisable={true} buttonHide='hidden'  leaveBtn='visible' subValue={entry.subject} descValue={entry.description} status={isDisabled} leaveDate={entry.createdAt} leaveUser={entry.userLeave} leaveId={entry._id}/>
          )}
            </div>
        </div>
      )
    )
  }

  return (
    <div className='h-screen w-screen bg-blackPearl'>
    <Navbar title='Back' path="/admin-Dashboard" icon={<IoMdArrowRoundBack />} />
    <div className=''>
      <h2 className='text-center text-3xl pt-5 text-yellow'>Leave Section</h2>
      <div className='w-screen pt-10 flex flex-col items-center gap-3'>
        {renderEntries()}
      </div>
    </div>
    </div>
  )
}

export default LeaveSection