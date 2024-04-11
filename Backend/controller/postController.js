import Post from "../models/postmodel.js"
import User from "../models/userModel.js"
import{v2 as cloudinary} from "cloudinary"

const createPost= async(req,res)=>{
    let {postedBy,text,img}=req.body
    try {
        if (!postedBy || !text){
            return res.status(400).json({error: " all the fields are required"})
        }

       const user = await User.findById(postedBy)
       if (!user){
           return res.status(400).json({error: "user not found"})
       }
       if (user._id.toString() !== req.user._id.toString()) {
            res.status(404).json({error: "Unauthorised to create Post"})
       }
       const maxlength =500
       if (text.length > maxlength) {
           return res.status(400).json({error: "text is too long"})
       }
       if(img){
        const uploadedResponse=await cloudinary.uploader.upload(img)
         img=uploadedResponse.secure_url
           
       }
       const newPost=new Post({postedBy,text,img})
        await newPost.save()
        res.status(201).json({
          postedby:  newPost.postedBy,
           text: newPost.text,
          img:  newPost.img,
           _id: newPost._id,

        })
        console.log("Post Created");
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error in createPost   "+ error.message);
    }
}
const getPost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post) return res.status(404).json({error:"Not Found"});
        if(post.postedBy.toString() !== req.user._id.toString())
        { 
            return res.status(404).json({error:"You can access only your post"})
         }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in getPost "+ error.message);
    }
}
const deletePost= async(req,res)=>{
    try {
       const post= await Post.findById(req.params.id)
       if(!post) return res.status(404).json({error:"Not Found"});
       if(post.postedBy.toString() !== req.user._id.toString()) return res.status(404).json({error:"Unauthorised to delete Post"})
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Post Deleted"})
        
    } catch (error) {
        res.status(404).json({error: error.message});
        console.log("Error in deletePost "+ error.message);
    }
}

const likePost=async (req,res)=>{
    try {
        const{id:PostId}=req.params;
        const userId=req.user._id
        // console.log(userId);
        const post= await Post.findById(PostId)
        if(!post) return res.status(404).json({error:"Post Not Found"});
        // console.log("post      "+post);

        const userLikedPost= post.likes.includes(userId)
        // console.log("userliked        "+userLikedPost);

        if(userLikedPost){
            await Post.updateOne({_id:PostId},{$pull:{likes:userId}})
            res.status(200).json({message: "Post Unliked"})
        }else{
            post.likes.push(userId)
            await post.save()
            res.status(200).json({message: "Post Liked"})
        }

        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in likePost "+ error.message);
    }
}

const replyToPost=async (req, res) => {
    try {
        const {text}=req.body;
        const postId=req.params.id
        const userId=req.user._id
        const userProfilePic=req.user.userProfilePic
        const username=req.user.username

        if (!text) {
            return res.status(400).json({error:"Text feils requires"})
        }
        const post= await Post.findById(postId)
        if(!post) return res.status(404).json({error:"Post Not Found"});
        const reply={userId,text,userProfilePic,username}
        // console.log(reply);

        post.replies.push(reply)
        await post.save()

        res.status(200).json({message: " Replied successfully"})
        console.log("Replied successfully");
    } catch (error) {
        res.status(404).json({error: error.message});
        console.log("Error in replyToPost "+ error.message);
    }
}

const getFeedPosts=async (req,res) => {
try {
    const userId=req.user._id
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({error:"User Not Found"})
    }
    const following=user.following
    const feedPosts= await Post.find({postedBy:{$in:following}}).sort({cretedAt:-1})
    res.status(200).json(feedPosts)

} catch (error) {
    res.status(400).json({error:error.message})
    console.log("Error getting feed posts" + error.message);
}

}

export {createPost,getPost,deletePost,likePost,replyToPost,getFeedPosts}