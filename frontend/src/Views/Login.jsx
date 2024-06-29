import React, { useState } from 'react'
import Input from '../Components/Input';
import Button from '../Components/Button';
import { IoHome } from "react-icons/io5";
import useLogin from '../hooks/useLogin';

//importing react icons
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Login = ({title=""}) => {
  const navigate = useNavigate();
  const {login} = useLogin();
  const [input,setInput] = useState({username:'',password:'',title:''});

  const handleSubmit =async (e,title)=>{
    e.preventDefault();
    input.title = title;
    const success = await login(input);
    if(success){
      setInput({
        username:'',
        password:'',
      })
      setTimeout(() => {
        if(title){
          navigate('/admin-Dashboard');
        }else{
          navigate('/student-Dashboard');
        }
      }, 500);
    }

  }
  const handleInputValues =(e)=>{
    const {name,value} = e.target;
    setInput({...input,[name]:value})
  }
  return (
    <div className='bg-blackPearl h-screen w-screen text-white'>
      <div className='absolute top-7 left-5'><Link to='/'><IoHome size={20}/></Link></div>
        <div className='top-[calc(50%-15.5rem)] left-[calc(50%-8rem)] absolute flex flex-col  items-center'>
            <h1 className='text-3xl  w-[16rem] text-center leading-relaxed'>Attendance System{title} Login</h1>
            <form className='mt-16 flex flex-col gap-6 items-center' action="" onSubmit={(e)=>handleSubmit(e,title)} >
                <Input name="username" label="Username" value={input.username} onChange={handleInputValues}/>
                <Input name="password" label="Password" type='password' value={input.password} onChange={handleInputValues}/>
                <Button className="mt-5 w-28 bg-green hover:bg-darkgreen" type="submit" name="Login" icon={<IoIosLogOut size={20}/>}/>
            </form>
            <Link to='/signup'> <p className='mt-8'>Don't have an account? Signup</p></Link> 
        </div>
        
    </div>
  )
}

export default Login