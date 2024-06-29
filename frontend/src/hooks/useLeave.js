
const useLeave = ()=>{
    const leave =async ({subject,description})=>{
        const res = await fetch('api/student/leave',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                subject,
                description
            })
        })
        const data =await res.json();
        if(data.message == 'leave requested'){
            return true
        }
        return false
    }
    return {leave}
}
export default useLeave;