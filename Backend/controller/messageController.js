import Conversation from "../models/coversationModel.js"
import Message from "../models/messageModel.js"
import { getrecipientsocketId } from "../socket/socket.js"
import { io } from "../socket/socket.js"
import{v2 as cloudinary} from "cloudinary"




const sendMessage=async(req,res)=>{
    try {
        const {recipientId, message} =req.body
        const senderId=req.user._id
        let {img} =req.body

        let conversation = await Conversation.findOne({
            participants:{$all: [recipientId, senderId]}
        });
        if (!conversation) {
            conversation= new Conversation({
                participants: [recipientId, senderId],
                lastmessage: {
                    text: message,
                    sender: senderId,
                    
                }
            });
            await conversation.save();
        }
        if(img){
            const uploadedResponse= await cloudinary.uploader.upload(img)
            img= uploadedResponse.secure_url
        }
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
            img: img || "",
        })
            await Promise.all([
                newMessage.save(),
                conversation.updateOne({
                    lastmessage:{
                        text: message,
                        sender: senderId,
                    }
                })
            ])
            const recipientSocketId= getrecipientsocketId(recipientId)
            if (recipientSocketId) {
            io.to(recipientSocketId).emit("newMessage",newMessage)
                
            }
        res.status(200).json(newMessage )
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
}
const getConversation=async(req,res)=>{
    const userId= req.user._id
     try {
       const conversations = await Conversation.find({participants:userId })
       .populate({
               path: 'participants',
               select: 'username profilepic', 
           })
           if (!conversations || conversations.length === 0) {
               return res.status(404).json({ message: "No conversations found" });
             }
          conversations.forEach((conversation)=>{
                conversation.participants=conversation.participants.filter(
                    (participant)=>participant._id.toString() !== userId.toString()
                )
          })   
   
       res.status(200).json(conversations)
     } catch (error) {
       res.status(500).json({error: error.message})
       console.log("Error in getConversation function: " + error.message);
     }
//    console.log("getConversation function");
   }
const getMessages = async (req, res) =>{
    const {otherUserId}= req.params
    const userId = req.user._id
    try {
        const conversation = await Conversation.findOne({
            participants:{$all: [userId,otherUserId]}
        })

        if (!conversation) {
            res.status(404).json({message: 'No Conversation found'})
        }

         const messages = await Message.find({
            conversationId: conversation._id
        }).sort({createdAt: 1})


        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error in getMessages function: " + error);
    }
//    console.log("getMessages function");

}


export {
    sendMessage,
    getMessages,
    getConversation
}

