import toast from 'react-hot-toast';
const useSignup = ()=>{

    const signup = async ({name,username,email,password,confirmPassword})=>{
        const success = handleInput(name,username,email,password,confirmPassword);
        if(!success) return false;

        try{
           const res= await fetch('/api/auth/signup',{
                method :'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name,username,email,password,confirmPassword
                })
           })

           const data =await res.json();
           if(data.message=='ok'){
            toast.success("User created Successfully");
            return true
           }
        
           if(data.error){
            throw new Error(data.error);
           }

        }catch(err){
            toast.error(err);
        }
       

        
    }
    

    return {signup}
}

export default useSignup;

function handleInput(name,username,email,password,confirmPassword){
    if(!name || !username || !email || !password || !confirmPassword){
        toast.error("Please fill all the feilds");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Passwords does not match");
        return false;
    }
    if(name.length<4){
        toast.error("Name must conatin 4 letters");
        return false;
    }
    if(password.length <6){
        toast.error("Password must conatin 6 letters");
        return false;
    }
    if(! email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        toast.error('Please enter a valid email');
        return false;
    }
    return true;
}