import toast from "react-hot-toast";
const useMarkleave = () => {

    const markLeave = async(userId,leaveId,date,status)=>{
        console.log(date)
        console.log(userId);
        console.log(status);
        console.log(leaveId);

        // try{
        //     const res = await fetch('/api/student/handleLeave',{
        //         method:"POST",
        //         headers:{
        //             "Content-Type":"application/json"
        //         },
        //         body:JSON.stringify({
        //             userId,
        //             leaveId,
        //             date,
        //             status
        //         })
        //     })
        // const data = await res.json();
        // console.log(data);
        // toast.success(data);

        // }catch(error){
        //     toast.error(error)
        // }

    }
    return {markLeave}
}
export default useMarkleave