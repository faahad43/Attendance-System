// i2fNgKsa5lVjPvQN
import mongoose from 'mongoose';

const uri = "mongodb+srv://fahadshah1060:i2fNgKsa5lVjPvQN@cluster0.sbqfwol.mongodb.net/Attendance_System?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

export default connectDB;

