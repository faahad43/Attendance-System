import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useLeave from '../hooks/useLeave';
import { useAuthContext } from '../context/authContext';
import Button from './Button';
import useMarkleave from '../hooks/useMarkLeave';

const Modal = ({sendModalDataToParent,status,note,SubDisable=false,descDisable=false,buttonHide='',leaveBtn="hidden",subValue='',descValue='',className='',leaveDate='',leaveUser='',leaveId=''}) => {
    const [iscloseModal,setIsCloseModal] = useState(status);
    const {authUser} = useAuthContext();
    const {markLeave} = useMarkleave();
    const [input,setInput]= useState({
        subject:'',
        description:''
    })
    const {leave} = useLeave();
    const handleModal =()=>{
        setIsCloseModal(!iscloseModal); 
        
    }
    useEffect(()=>{
        sendModalDataToParent(iscloseModal);
    },[iscloseModal])
    
    useEffect(() => {
        if (subValue || descValue) {
            setInput({
                subject: subValue,
                description: descValue
            });
        }
    }, [subValue, descValue]);

    const handleLeave = async (status,date,userId,leaveId) => {
        const data = await markLeave(userId,leaveId,date,status);
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const lastLeaveClicked = localStorage.getItem(`lastLeaveClicked${authUser.username}`);
     
        const today = new Date().toLocaleDateString();
  
      
      if(lastLeaveClicked === today){
          toast.error("Leave can be submitted only once a day.");
      }else{
        localStorage.setItem(`lastLeaveClicked${authUser.username}`,today);
        const success = await leave(input);
        if(success){
            toast.success("Leave Submitted Successfully");
            setInput({subject:'',description:''});
        }else{
            toast.error("Leave Submission failed");
        }
      }
    }
    const handleInputValues =(e)=>{
        const {name,value} = e.target;
        setInput({...input,[name]:value})
        
      }

  return (
    <div className={`${className} `}>

            <div id="crud-modal" tabindex="-1" aria-hidden="true" className={`${iscloseModal?'hidden':''}  overflow-y-auto overflow-x-hidden fixed z-50 left-0 right-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`} style={{top:'calc(20%)'}}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
                        <div className="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Request For Leave
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <p className='text-black border-b px-4 pb-2'>{note}</p>
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                    <input type="text" name="subject" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Subject of Application" required="" disabled={SubDisable} value={input.subject} onChange={handleInputValues}/>
                                </div>
                                
                               
                                <div className="col-span-2">
                                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave Description</label>
                                    <textarea id="description" rows="4" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write leave description here" value={input.description} onChange={handleInputValues} disabled={descDisable}></textarea>                    
                                </div>
                            </div>
                            <button type="submit" className={`text-white ${buttonHide} inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                                Submit Application
                            </button>
                            <div className={`${leaveBtn} flex justify-center gap-4`}>
                                <Button name="Approve" className="bg-green rounded-sm text-[1rem]" onClick={()=>handleLeave('leave',leaveDate,leaveUser,leaveId)}/>
                                <Button name="Reject" className="bg-red-500 rounded-sm text-[1rem] w-28" onClick={()=>handleLeave('absent',leaveDate,leaveUser,leaveId)}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 

    </div>
  )
}

export default Modal