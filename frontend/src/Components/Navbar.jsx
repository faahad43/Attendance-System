import React,{useState} from 'react'
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate} from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from "../context/authContext";
import toast from 'react-hot-toast';

const Navbar = ({title="Dashboard",path='/student-Dashboard',icon=""}) => {
    const [setting,setSetting] = useState(false);
    const {logout} = useLogout();
    const navigate = useNavigate();
    const {setAuthUser} = useAuthContext();


    const handleLogout =async () =>{
      const success = await logout();
      if(success){
        toast.success('Logout successfully');
        localStorage.removeItem('authUser');
        setAuthUser(null);
        navigate('/login');
        
      }
    }

  return (
    <div className=" w-screen h-16 relative bg-lightBlackPearl p-4 flex items-center justify-between ">
            <Link to={path}><div className='font-semibold text-orange text-xl flex items-center gap-2 justify-center'>{icon}{title}</div></Link>
            <div className='flex gap-2 items-center cursor-pointer'>
                <div className='w-10 h-10 bg-white rounded-full'></div>
                <FaCaretDown size={30} color='#FF8427' onClick={()=>setSetting(!setting)}/>
            </div>
            <div className={`${setting?'visible':'invisible'} absolute flex flex-col text-center  text-lg justify-evenly  p-2 w-36 h-24 bg-white top-10 rounded-sm right-4`}>
                <p className=' border-b-2 pb-1 cursor-pointer hover:bg-orange'>Edit Picture</p>
                <p className=' border-b-2 pb-1 cursor-pointer hover:bg-orange' onClick={handleLogout}>Logout</p>
            </div>
    </div>
  )
}

export default Navbar