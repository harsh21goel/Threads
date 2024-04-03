import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import genrateTokenAndSetCookie from "../utils/helperfn/generateTokenAndSetCookie.js";

const signupUser= async(req,res)=>{
    try {
        const{name,email,username,password}=req.body
        const user=await User.findOne({email,username})
        if (user) {
            return res.status(400).json({message:"User alreay exist"})
        }
         const salt= await bcrypt.genSalt(10)
         const hashedPassword=await bcrypt.hash(password,salt)

         const newUser=new User({
            name,
            email,
            username,
            password:hashedPassword
         })
         await newUser.save()
         if (newUser) {

            genrateTokenAndSetCookie(newUser._id,res)

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                name: newUser.name,
                email: newUser.email,
            })
         }else{
            res.status(400).json({message:"Invalid User Data"})
         }






    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in signupuser   "+ error.message);
    }
}
const loginUser=async (req,res)=>{
    try {
        const{username,password}=req.body
        const user=await User.findOne({username})

        if(!user ) {return res.status(400).json({message: 'Invalid username or password'})}

        const isPasswordCorrect= await bcrypt.compare(password,user?.password || "")

        if(!isPasswordCorrect) {return res.status(400).json({message: 'Invalid username or password'})}

        genrateTokenAndSetCookie(user._id,res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
        })
        console.log("successfully logged in");

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in loginUser  "+ error.message);
    }

}

const logoutUser = async (req, res) => {
try {
    res.cookie("jwt","",{maxAge: 1 })
    res.status(200).json({message:"successfully logged out"})
} catch (error) {
    res.status(404).json({message:"Error in logoutUser"})
    console.log("Error in logoutUser  "+ error.message);
}
}
const followUnfollow=async (req,res)=>{
    try {
        const {id} =req.params
        const userToModify= await User.findById(id)
        const currentUser=await User.findById(req.user._id);

        if(id === req.user._id.toString()) return res.status(400).json({message: "You can't follow/unfollow  yourself"})

        if(!userToModify || !currentUser)return res.status(400).json({message:"User not found"})
        const isfollowing=currentUser.following.includes(id)

        if (isfollowing) {
            await User.findByIdAndUpdate(req.user._id,{$pull:{following: id}})
            await User.findByIdAndUpdate(id,{$pull:{followers: req.user._id}})
            res.status(200).json({success:"User Unfollowed successfully"})
        } else {
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            res.status(200).json({success:"User Followed successfully"})
        }


    } catch (error) {
            res.status(500).json({message: error.message})
            console.log("Error in Follow Unfollow function: " + error.message);
    }
}

const updateUserProfile=async (req, res) => {
    const {name,email,password,profilepic,bio} =req.body;
    const userId=req.user._id
    try {
        if(req.params.id !== userId.toString()){
                return res.status(400).json({message:"you can not update other user profile"})
        }

        let user =await User.findById(userId)
        if(!user) return res.status(400).json({message:"User not found"})
        if(password){
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
            user.password=hashedPassword
        }
        
        user.name= name || user.name;
        user.email= email || user.email;
        user.profilepic=profilepic || user.profilepic;
        user.bio= bio || user.bio;

        user= await user.save();
        res.status(200).json({message:"User updated successfully",user})



    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in updateUserProfile function: " + error.message);
    }
}





export  {signupUser,
    loginUser,
    logoutUser,
followUnfollow,
updateUserProfile


};