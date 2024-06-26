import Post from "../models/postmodel.js"
import User from "../models/userModel.js"
import{v2 as cloudinary} from "cloudinary"

const createPost = async (req, res) => {
	try {
		const { postedBy, text } = req.body;
		let { img } = req.body;

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({ postedBy, text, img });
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const getPost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post) return res.status(404).json({error:"Not Found"});
        
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

       if(post.img){
        const PostImgId= post.img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(PostImgId)
       }    
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
        const userProfilepic=req.user.profilepic

        const username=req.user.username

        if (!text) {
            return res.status(400).json({error:"Text feils requires"})
        }
        const post= await Post.findById(postId)
        if(!post) return res.status(404).json({error:"Post Not Found"});
        const reply={userId,text,userProfilepic,username}
        if(!userProfilepic) return res.status(404).json({error:"No profile pic"})
        console.log(reply);

        post.replies.push(reply)
        await post.save()

        res.status(200).json(reply)
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
    // const feedPostsArray = Array.isArray(feedPosts) ? feedPosts : Array.from(feedPosts);
    res.status(200).json(feedPosts)

} catch (error) {
    res.status(400).json({error:error.message})
    console.log("Error getting feed posts" + error.message);
}

}
const getUserPosts=async (req,res)=>{
    const {username}=req.params;
    try {
        const user= await User.findOne({username})
        if(!user){
            return res.status(404).json({error:"User Not Found"})
        }
        const posts=await Post.find({postedBy:user._id}).sort({cretedAt:-1});
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export {createPost,getPost,deletePost,likePost,replyToPost,getFeedPosts,getUserPosts}