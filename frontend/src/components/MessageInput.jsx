import { InputGroup, Input, InputRightElement, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, useDisclosure, Spinner } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useshowToast from "../hooks/useshowToast.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationAtom, selectedConversationAtom } from "../atoms/ConversationAtom";
import { BsFillImageFill } from "react-icons/bs";
import useImagePreview from "../hooks/useImagePreview.js";

const MessageInput = ({ setmessages }) => {
  const [messagetxt, setmessagetxt] = useState("");
  const showtoast = useshowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [conversation,setconversation] =useRecoilState(conversationAtom)
  const imageRef =useRef(null)
  const {onClose} = useDisclosure()
 const {handleImageChange,imageUrl,setimageUrl}= useImagePreview()
 const  [isSending, setisSending]= useState(false)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messagetxt && !imageUrl) return;
    if (isSending) return
    setisSending(true)
    try {
      const res = await fetch("api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messagetxt,
          recipientId: selectedConversation.userId,
          img: imageUrl,
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
      setimageUrl("")
    } catch (error) {
      showtoast("error", error.message, "error");
    }finally{
      setisSending(false)
    }
  };

  return (
    <Flex gap={2} alignItems={"center"}>

    <form onSubmit={handleSendMessage} style={{flex:95}}>
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
    <Flex flex={5} cursor={"pointer"}>
      <BsFillImageFill size={20} onClick={()=>imageRef.current.click()}/>
        <Input type="file" hidden ref={imageRef} onChange={handleImageChange}/>
    </Flex>
    <Modal
    isOpen={imageUrl}
    onClose={()=>{
      onClose()
      setimageUrl("")
    }}
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton/>
          <ModalBody>
            <Flex mt={5} w={"full"}>
              <Image
              src={imageUrl}
              />
            </Flex>
            <Flex justifyContent={"flex-end"} my={2}>
                 {!isSending? (
                   <IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage}/>
                 ):(
                  <Spinner size={"md"}/>
                 )}
            </Flex>
          </ModalBody>
      </ModalContent>
    </Modal>
          </Flex>
  );
};

export default MessageInput;
