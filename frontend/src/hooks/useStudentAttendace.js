
import toast from "react-hot-toast";
const useStudentAttendance = () =>{

    const studentAttendance = async (username) =>{
        try{
            const res = await fetch('/api/student/studentAttendance',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username})
            })
            const data = await res.json();
            const array = [data.message,data.name]
            return array;
        }catch(error){
            toast.error(error);
        }
    }

    return {studentAttendance}
}
export default useStudentAttendance