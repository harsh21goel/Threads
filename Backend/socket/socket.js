import{Server} from "socket.io"
import http from "http"
import express from "express"
import message from "../models/messageModel.js"

import Conversation from "../models/coversationModel.js"
const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

export const getrecipientsocketId=(recipientId)=>{
    return userSocketmap[recipientId]
    }
const userSocketmap={};


io.on("connection",(socket)=>{
console.log("user connected " + socket.id);


const userId= socket.handshake.query.userId;
if(userId !== undefined) userSocketmap[userId] = socket.id
io.emit("getOnlineUsers", Object.keys(userSocketmap))

socket.on("markMessageAsSeen", async({conversationId,userId}) => {
    try {
        await message.updateMany({conversationId: conversationId, seen:false},{$set:{seen:true}})
        await Conversation.updateOne({_id: conversationId},{$set:{"lastmessage.seen":true}})
        io.to(userSocketmap[userId]).emit("messagesSeen",{conversationId})
    } catch (error) {
        console.log(error);
    }
})



socket.on("disconnect",()=>{
    console.log("user disconnected");
    delete userSocketmap[userId]
io.emit("getOnlineUsers", Object.keys(userSocketmap))

});
})



export {io,server,app}