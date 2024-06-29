import mongoose from "mongoose";

const requestLeaveModel = mongoose.Schema({
    userLeave:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    leaveStatus:{
        type:String,
        required:true,
        default:'pending'
    },
    subject:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    
},{timestamps:true})

const markLeave = mongoose.model('Request Leaves',requestLeaveModel);
export default markLeave;