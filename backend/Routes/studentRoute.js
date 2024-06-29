import express from "express"
import { mark,leave ,viewAttendance,viewStudents,studentAttendance,changeAttendance,viewLeave,handleLeave} from "../Controllers/studentController.js";


const router = express.Router();

router.post('/markAttendance',mark);
router.post('/leave',leave);
router.post('/viewAttendance',viewAttendance);
router.post('/viewStudents',viewStudents)
router.post('/studentAttendance',studentAttendance)
router.post('/changeAttendance',changeAttendance);
router.post('/viewLeave',viewLeave);
router.post('/handleLeave',handleLeave)


export default router;