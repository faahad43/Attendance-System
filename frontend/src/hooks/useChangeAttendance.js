import toast from "react-hot-toast";

const useChangeAttendance = () =>{

    const changeAttendance = async ({userId,date,preStatus,newStatus}) =>{
        try{
            const res = await fetch('/api/student/changeAttendance',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    userId,
                    date,
                    newStatus
                })
            })
            const data = await res.json();
            if(data.error){
                toast.error(data.error);
            }else{
                if(preStatus !== newStatus){
                    toast.success(data.message);
                }  
            }
            

        }catch(error){
            console.log(error);
        }
    }
    return {changeAttendance}
}
export default useChangeAttendance