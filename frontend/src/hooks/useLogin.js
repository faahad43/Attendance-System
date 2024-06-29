import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext';

const useLogin = ()=>{

    const {setAuthUser} =useAuthContext();

    const login =async ({username,password,title=''})=>{
        const success = handleInput(username,password);
       
        if(!success){
            return
        }
        try{
            
            if(title){
                var res =await fetch ('api/auth/admin-login',{
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({username,password})
            })
            }else{
                var res =await fetch ('api/auth/login',{
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({username,password})
             })
            }
            const data = await res.json();
        
            if(data.message == 'ok'){
                localStorage.setItem("authUser", JSON.stringify(data.userData));
                setAuthUser(data.userData);
                toast.success("Login successful");
                return true;
            }
            if(data.message){
                toast.error(data.message);
            }
            
            }catch(err){
                toast.error("Failed to Login",err);
                console.log(err);
            }
    }

    return {login};

}
export default useLogin;

function handleInput(username,password){
    if(!username || !password){
        toast.error("Please fill all the fields");
        return false;
    }
    return true

}