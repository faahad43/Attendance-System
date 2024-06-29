import React, { useState } from 'react'
import Input from '../Components/Input';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import useSignup from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

//importing react icons
import { IoPersonAddOutline } from "react-icons/io5";


const Registration = () => {
  const navigate = useNavigate();

  const [input,setInput] = useState({
    name:'',
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })

    const {signup} = useSignup()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const success =await signup(input);
    if(success){
    setInput({
      name:'',
      username:'',
      email:'',
      password:'',
      confirmPassword:''
    })
    setTimeout(()=>{navigate('/login');},500)
    
    }
  }

  const handleInputValue = (e) =>{
    const {name, value} =e.target;
    setInput({...input,[name]:value});
  }

  return (
    <div className='bg-blackPearl h-screen w-screen text-white'>
        <div className='absolute top-7 left-5'><Link to='/'><IoHome size={20}/></Link></div>
        <div className='top-[calc(50%-17rem)] left-[calc(50%-8rem)] absolute flex flex-col  items-center'>
            <h1 className='text-3xl  w-[16rem] text-center leading-relaxed'>Attendance System Signup</h1>
            <form className='mt-14  flex flex-col gap-6 items-center' action="" onSubmit={handleSubmit} >
                <Input name="name" label="Name" value={input.name} onChange={handleInputValue}/>
                <Input name="username" label="Username" value={input.username} onChange={handleInputValue}/>
                <Input name="email" label="Email" value={input.email} onChange={handleInputValue}/>
                <Input name="password" label="Password" type='password' value={input.password} onChange={handleInputValue}/>
                <Input name="confirmPassword" label="Conifrm Password" type='password' value={input.confirmPassword} onChange={handleInputValue}/>
                <Button className="mt-5 w-28 bg-green hover:bg-darkgreen" type='submit' name="Signup" icon={<IoPersonAddOutline  size={15}/>}/>
            </form>
            <Link to='/login'><p className='mt-8'>Already have an account? Login</p></Link>
        </div>
        
    </div>
  )
}

export default Registration