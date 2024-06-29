import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:[4, "Name must conatain minimum four letter"],
        
    },
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        require:true,
        min:[6, "Password must be atleast 6 digit long"],
    },status:{
        type:String,
        require:true,
        default:"student"
    }
})

const User = mongoose.model("User",userSchema);
export default User;