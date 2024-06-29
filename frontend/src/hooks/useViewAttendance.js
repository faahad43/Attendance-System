import toast from "react-hot-toast";

const useViewAttendance = ()=>{
    
    const viewAttendance = async () =>{
        try{
            const res = await fetch('/api/student/viewAttendance',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json();
            return data.message;
        }catch(error){
            toast.error(error);
        }
    }
    return {viewAttendance}
}
export default useViewAttendance