import { Avatar, Box, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import {  selectedConversationAtom } from '../atoms/ConversationAtom'
import {BsCheck2All} from "react-icons/bs"
const Message = ({OwnMessage, message}) => {
    const user =useRecoilValue(userAtom)
    const selectedConversation=useRecoilValue(selectedConversationAtom)
    // console.log(selectedConversation);
  return (
    <>
    
    {OwnMessage ? (
        <Flex
        gap={2}
        alignSelf={"flex-end"}
        
        >
           <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
                    <Text color={"white"} >{message.text}</Text>
                    <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"} color={message.seen? "blue.400": ""}>
                            <BsCheck2All size={16}/>
                    </Box>
           </Flex>
                <Avatar src={user.profilepic} w={7} h={7}/>
        </Flex>
    ):(
        <Flex
        gap={2}
        >
                <Avatar src={selectedConversation.profilepic} w={7} h={7}/>

            <Text maxW={"350px"} borderRadius={"md"} p={1} bg={"gray.800"}>
            {message.text}
            </Text>
        </Flex>
    )}
    </>
  )
}

export default Message