import { InputGroup ,Input, InputRightElement} from '@chakra-ui/react'
import React, { useState } from 'react'
import {IoSendSharp} from "react-icons/io5"
import useshowToast from '../Hooks/useshowToast'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/ConversationAtom'
const MessageInput = ({setmessages}) => {
  const [messagetxt,setmessagetxt]=useState("")
const showtoast=useshowToast()
  const handleSendMessage = async ()=>{
    const selectedConversation = useRecoilValue(selectedConversationAtom)
const recipientId= selectedConversation.userId
e.preventdefault()
if (!messagetxt) return

    try {
      const res = await fetch("api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:messagetxt,
          recipientId: recipientId
        }),
        
      })
      const data= await res.json()
      console.log(data);
    } catch (error) {
      showtoast("error", error.message, "error")
    }
  }



  return (
    <form onSubmit={handleSendMessage}>
        <InputGroup>
        <Input w={"full"} placeholder='Type a message' onChange={(e)=>setmessagetxt(e.target.value)}/>
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
            <IoSendSharp/>
        </InputRightElement>
        </InputGroup>
    </form>
  )
}

export default MessageInput