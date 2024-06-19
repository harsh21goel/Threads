import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useshowToast from "../Hooks/useshowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationAtom, selectedConversationAtom } from "../atoms/ConversationAtom";
const MessageInput = ({ setmessages }) => {
  const [messagetxt, setmessagetxt] = useState("");
  const showtoast = useshowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [conversation,setconversation] =useRecoilState(conversationAtom)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messagetxt) return;

    try {
      const res = await fetch("api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messagetxt,
          recipientId: selectedConversation.userId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showtoast("error", data.error, "error");
        return;
      }
      setmessages((messages) => [...messages, data]);
      setconversation(prevConv=> {
        const updatedConvs= prevConv.map(conversation=>{
          if (conversation._id=== selectedConversation._id) {
            return {
              ...conversation,
              lastmessage:{
                text:messagetxt,
                sender:data.sender
              }
            }
          }
          return conversation
        })
        return updatedConvs
      })
      setmessagetxt("")

    } catch (error) {
      showtoast("error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message"
          onChange={(e) => setmessagetxt(e.target.value)}
          value={messagetxt}
        />
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
