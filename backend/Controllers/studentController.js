import markAttendance from "../Models/markAttendanceModel.js";
import markLeave from "../Models/requestLeaveModel.js";
import User from "../Models/userModel.js";

export  const mark =async (req,res)=>{
    let userId;
    if(req.body.userId){
        userId= req.body.userId;
    }else{
         userId = req.user._id;
    }
    const newAttendanceEntry = new markAttendance({
        userAttendance: userId,
        attendanceStatus: 'present'
    })

    if(newAttendanceEntry){
    await newAttendanceEntry.save();
    res.status(200).json({message:'ok'});
    console.log("Attendance marked")
    }else{
        res.status(401).json({message:"Error while marking attendance"});
    }
    
}

export const leave = async (req,res)=>{
    const subject= req.body.subject;
    const description = req.body.description;
    const userId = req.user._id;

    const newLeaveRequest = new markLeave({
        userLeave : userId,
        subject,
        description,

    })

    if(newLeaveRequest){
        await newLeaveRequest.save();
        console.log("saved");
        res.status(200).json({message:"leave requested"})
    }else{
        res.status(401).json({message:"Error while requesting leave."})
    }
}

export const viewAttendance = async (req,res)=>{
    const userId = req.user._id;
    
    const data =await markAttendance.find({userAttendance:userId});
    if(data){
        res.status(200).json({message:data})
    }else{
        res.status(500).json({message:"Internal server error while receiving data."});
    }
}

export const viewStudents = async (req,res) => {
    const data = await User.find({status:"student"}).select("_id name username");
    if(data){
        res.status(200).json({message:data})
    }else{
        res.status(500).json({error:"Internal Server error"})
    }
}


export const studentAttendance = async (req,res) => {
    const userName = req.body.username;
    const userData =await User.find({username:userName});
    const userId = userData[0]._id;
    const data = await markAttendance.find({userAttendance:userId})
    if(data){
        res.status(200).json({message:data,name:userData[0].name})
    }else{
        res.status(500).json({error:"Internal server error while receiving data."});
    }
}

export const changeAttendance = async (req,res) =>{
    const userAttendance = req.body.userId;
    const attendanceStatus = req.body.newStatus;
    const createdAt = req.body.date

    const filter = { userAttendance: userAttendance, createdAt: createdAt };
    const updateDoc = {
      $set: {
        attendanceStatus: attendanceStatus
      },
    };

    const data = await markAttendance.updateOne(filter, updateDoc);
    if(data){
        if(attendanceStatus === "present"){
            res.status(200).json({message:"present"})
        }else{
            res.status(200).json({message:"absent"})
        }
    }else{
        res.status(500).json({error:"Error while updating value"});
    }
    
}

export const viewLeave = async (req, res) => {
    try {
      const data = await markLeave.aggregate([
        {
          $lookup: {
            from: 'users', // The name of the User collection
            localField: 'userLeave',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        {
          $unwind: '$userDetails'
        },
        {
          $project: {
            _id: 1,
            userLeave: 1,
            leaveStatus: 1,
            subject: 1,
            description: 1,
            createdAt: 1,
            updatedAt: 1,
            'userDetails.name': 1 // Assuming the User collection has a 'name' field
          }
        }
      ]);
  
      if (data) {
        res.status(200).json({ message: data });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const handleLeave = async (req, res) => {
    const { userId, leaveId, status: leaveStatus, date } = req.body;

    try {
        // Find and update the document in markAttendance
        const result = await markAttendance.findOneAndUpdate(
            { userAttendance: userId, createdAt: date },
            { attendanceStatus: leaveStatus },
            { new: true }
        );

        if (!result) {
            // If no document was found, create a new one
            await markAttendance.create({
                userAttendance: userId,
                createdAt: date,
                attendanceStatus: leaveStatus
            });
        }

        // Delete the document from markLeave
        await markLeave.findByIdAndDelete(leaveId);

        res.status(200).send({ message: 'Leave processed successfully' });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
};