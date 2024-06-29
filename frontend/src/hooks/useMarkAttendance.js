import toast from "react-hot-toast";

const useMarkAttendance = ()=>{
    const markAttendance = async(userId='')=>{
        try{
            const res = await fetch('/api/student/markAttendance',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    status:true,
                    userId,
                })
            });

            const data =await res.json();
            if(data.message === 'ok'){
                return true;
            }else{
                return false;
            }
            

        }catch(err){
            toast.error(err);
        }
    }

    return {markAttendance}
}
export default useMarkAttendance;