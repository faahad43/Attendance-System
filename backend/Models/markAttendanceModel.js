import mongoose from "mongoose";

const markAttendanceSchema = mongoose.Schema({
    userAttendance :{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    attendanceStatus:{
        type:String,
        default:'unmarked'
    }


},{timestamps:true});


const markAttendance = mongoose.model("Mark Attendance",markAttendanceSchema);

export default markAttendance;