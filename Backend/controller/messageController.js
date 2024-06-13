import Conversation from "../models/coversationModel.js"
import Message from "../models/messageModel.js"





const sendMessage=async(req,res)=>{
    try {
        const {recipientId, message} =req.body
        const senderId=req.user._id

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
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
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
        res.status(200).json(newMessage )
    } catch (error) {
        res.status(500).json({message: error})
    }
}
const getMessages = async (req, res) =>{
    const {otherUserId}= req.params
    const userId = req.user._id
    try {
        const conversation = await Conversation.findOne({
            participants:{$all: [userId,otherUserId ]}
        })

        if (!conversation) {
            res.status(404).json({message: 'No Conversation found'})
        }

         const messages = await Message.find({
            conversationId: conversation._id
        }).sort({createdAt: -1})

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error in getMessages function: " + error.message);
    }
}

export {
    sendMessage,
    getMessages,
}

