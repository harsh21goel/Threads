import express from "express";
import { signupUser,loginUser,logoutUser ,followUnfollow,updateUserProfile, getProfile } from "../controller/userController.js";
import protectRoute from "../middleware/protectRoute.js";
const router=express.Router();


router.get("/profile/:username", getProfile)
router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.post("/follow/:id",protectRoute, followUnfollow)
router.post("/update/:id",protectRoute, updateUserProfile)

export default router

