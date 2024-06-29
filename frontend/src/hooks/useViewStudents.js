import toast from "react-hot-toast";

const useViewStudents = () =>{

    const viewStudents = async () =>{
        try{
            const res = await fetch ('/api/student/viewStudents',{
                method:"POST",
                headers:{
                    "Content-Type": "application/josn"
                },
            })
            const data = await res.json();
            return data.message
        }catch(error){
            toast.error(data.error)
            return false;
        }
    }
    return {viewStudents}
}
export default useViewStudents