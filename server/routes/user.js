import express from "express"
import  {login,signup} from '../controller/auth.js'
import { getallUsers,updateprofile , getLoginHistory} from "../controller/userCtrl.js";
import auth from "../middleware/auth.js"

const userroutes=express.Router();

userroutes.post("/signup",signup);
userroutes.post("/login", login);

userroutes.get("/getallusers", getallUsers);
userroutes.get("/history/:userId", auth, getLoginHistory);
userroutes.patch("/update/:id", auth, updateprofile);


export default userroutes;