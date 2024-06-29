import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './DB/connectToDb.js';
import cookieParser from 'cookie-parser';
import protectedRoute from './Middleware/protectedRoute.js';

import authRoute from './Routes/authRoute.js'
import studentRoute from './Routes/studentRoute.js'

const app = express();

const portNo = 3000;

connectDB();
app.use(express.json());
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send("The backend server is running");
})

app.use('/api/auth',authRoute);
app.use('/api/student',protectedRoute,studentRoute);



app.listen(portNo,(error)=>{
    if(!error){
    console.log(`Server is listening on port ${portNo}`);
    }else{
        console.log(`Error: ${error}`);
    }
})