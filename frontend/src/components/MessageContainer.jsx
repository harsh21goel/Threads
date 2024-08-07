import { Avatar, Flex, useColorModeValue,Text,Image, Divider, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { conversationAtom, selectedConversationAtom } from '../atoms/ConversationAtom'
import { useEffect } from 'react'
import useshowToast from '../hooks/useshowToast'
import userAtom from '../atoms/userAtom'
import { useSocket } from '../context/SocketContext'

const MessageContainer = () => {
    const showtoast= useshowToast()
    const [selectedConversation, setselectedConversation] = useRecoilState(selectedConversationAtom)
    const [messages,setmessages]= useState([])
    const [loadingMessage ,setloaadingMessage] = useState(true)
    const Currentuser = useRecoilValue(userAtom)
    const {socket}= useSocket()
    const setConversation= useSetRecoilState(conversationAtom)
    const mssgEnfRef= useRef()
    useEffect(()=>{
        socket.on("newMessage",(message)=>{
            if (selectedConversation._id === message.conversationId)  {
            setmessages((prevmssg)=>[...prevmssg,message])
                
            }
            setConversation((prev)=>{
                const updatedConvs= prev.map((conversation)=>{
            if (conversation._id=== message.conversationId) {
                return{
                    ...conversation,
                                        lastmessage:{
                                            text:message.text,
                                            sender:message.sender
                                        }
                }
            }
            return conversation
                })
                return updatedConvs
            })
        })
        return()=>socket.off("newMessage")
    },[socket,messages])

    useEffect(()=>{
        const lastMessageFromOtherUser= messages.length && messages[messages.length-1].sender !== Currentuser._id
        if (lastMessageFromOtherUser) {
            socket.emit("markMessageAsSeen",{
                conversationId: selectedConversation._id,
                userId: selectedConversation.userId
            })
        }
        socket.on("messagesSeen",({conversationId})=>{
        if (selectedConversation._id=== conversationId) {
            setmessages(prev =>{
                const updatedMessage= prev.map(mssg=>{
                    if (!mssg.seen) {
                        return {
                            ...mssg,
                            seen: true
                        }
                    }
                    return mssg
                })
                return updatedMessage
            })
        }
        })
    },[socket,Currentuser._id,messages,selectedConversation])
    useEffect(()=>{
        
        mssgEnfRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])

    useEffect(()=>{
        const getMessage = async ()=>{
           
            try {
                setloaadingMessage(true)
                setmessages([])
                // console.log(selectedConversation);
                if(selectedConversation.mock) return ;
                const res= await fetch(`api/messages/${selectedConversation.userId}`)
            const data= await res.json()
            if(data.error){
                showtoast("Error", data.error, "error")
                return
            }
            // console.log(data);
           setmessages(data)

            } catch (error) {
                showtoast("Error", error.message, "error")
            }finally{
                setloaadingMessage(false)
            }
        }
        getMessage()
    },[showtoast,selectedConversation])
  return (
    <Flex
    flex={70}
    flexDir={"column"}
    borderRadius={"md"}
    bg={useColorModeValue("gray.200","gray.dark")}
    p={2}
    >
        

        {/* {"Message header"} */}
        <Flex
        w={"full"}
        h={12}
        alignItems={"center"}
        gap={2}

        >
           <Avatar src={selectedConversation.profilepic}  size={"sm"}/>
           <Text display={"flex"} alignItems={"center"}> 
            {selectedConversation.username} <Image src="verified.png" w={4} h={4} ml={1} /></Text>
        </Flex>

        <Divider/>
        {/* {mesaage Body} */}
        <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        height={"400px"}
        overflowY={"auto"}
        >
            {loadingMessage &&
             [...Array(5)].map((_,i)=>(
                <Flex 
                key={i}
                gap={2}
                alignItems={"center"}
                borderRadius={"md"}
                alignSelf={i%2===0 ? "flex-start" : "flex-end"}
                p={1}
                >
                    {i % 2 ===0 && <SkeletonCircle size={7}/>}
                    <Flex
                    flexDir={"column"}
                    gap={2}
                    >
                        <Skeleton h={"8px"} w={"250px"}/>
                        <Skeleton h={"8px"} w={"250px"}/>
                        <Skeleton h={"8px"} w={"250px"}/>
                        <Skeleton h={"8px"} w={"250px"}/>
                    </Flex>
                    {i %2 !== 0 && <SkeletonCircle size={7} />}
                </Flex>
            ))}
           {!loadingMessage &&  (
            messages.map((message)=>(
                <Flex key={message._id} direction={"column"}
                ref={messages.length-1=== messages.indexOf(message)? mssgEnfRef: null}
                >
                    
                    <Message  message={message} OwnMessage={Currentuser._id === message.sender} />
                </Flex>
            ))
           )}
        </Flex>
        <MessageInput setmessages={setmessages}/>
    </Flex>
  )
}

export default MessageContainer