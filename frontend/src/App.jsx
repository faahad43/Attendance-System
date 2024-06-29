import { BrowserRouter,Navigate, Route, Routes } from "react-router-dom"
import Login from "./Views/Login"
import Registration from "./Views/Registration"
import Home from "./Views/Home"
import { Toaster } from 'react-hot-toast';
import StudentDashboard from "./Views/StudentDashboard";
import ViewAttendance from "./Views/ViewAttendance";
import AdminDashboard from "./Views/AdminDashboard";
import ViewAllStudents from "./Views/ViewAllStudents";
import LeaveSection from "./Views/LeaveSection";
import StudentAttendance from "./Views/StudentAttendance";
import { useAuthContext } from "./context/authContext";

function App() {
  const {authUser} = useAuthContext();
  
  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? (authUser.name=="Admin"? <Navigate to="/admin-Dashboard"/> :<Navigate to="/student-Dashboard" />): <Home/>} />

        <Route path="/login" element={authUser ? (authUser.name=="Admin"? <Navigate to="/admin-Dashboard"/> :<Navigate to="/student-Dashboard" />): <Login/>}/>

        <Route path="/admin-login" element={authUser ? (authUser.name=="Admin"? <Navigate to="/admin-Dashboard"/> :<Navigate to="/student-Dashboard" />): <Login title=" Admin"/>}/>

        <Route path="/signup" element={authUser ? (authUser.name=="Admin"? <Navigate to="/admin-Dashboard"/> :<Navigate to="/student-Dashboard" />): <Registration/>}/>

        <Route path="/student-Dashboard" element={authUser ? (authUser.name=="Admin"? <Navigate to="/admin-Dashboard"/> :<StudentDashboard/>):<Navigate to="/login" /> }/>

        <Route path="/admin-Dashboard" element={authUser?(authUser.name=="Admin"?<AdminDashboard/> : <Navigate to="/student-Dashboard"/>):<Navigate to="/login" />}/>

        <Route path="/view-attendance" element={authUser ? (authUser.name=="Admin"?<Navigate to="/admin-Dashboard"/> : <ViewAttendance/> ) : <Navigate to="/login" /> }/>

        <Route path="/student-attendance/:username" element={authUser ? (authUser.name=="Admin"? <StudentAttendance/> :<Navigate to="/student-Dashboard"/>) : <Navigate to="/login" /> }/>

        <Route path="/all-students" element={authUser?(authUser.name=="Admin"?<ViewAllStudents/> : <Navigate to="/student-Dashboard"/>):<Navigate to="/login" />}/>

        <Route path="/leave-section" element={authUser?(authUser.name=="Admin"?<LeaveSection/> : <Navigate to="/student-Dashboard"/>):<Navigate to="/login" />}/>

        <Route 
        path="*" 
        element={authUser ? (authUser.name=="Admin"? <Navigate to="/admin-Dashboard"/> :<Navigate to="/student-Dashboard" />): <Home/>} 
      />

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
