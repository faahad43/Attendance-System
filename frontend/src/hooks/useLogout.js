import toast from "react-hot-toast";

const useLogout = ()=>{       
    const logout = async ()=>{
        try{
                const res = await fetch ('/api/auth/logout',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })

                const data = await res.json();
                if(data.error){
                    toast.error(data.error);
                }
                if(data.message === 'ok'){
                    return true;
                }
            }catch(error){
                toast.error(error);
        }
        return false

    }
    return {logout}
}
export default useLogout