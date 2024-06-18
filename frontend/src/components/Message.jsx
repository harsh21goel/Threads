import { Avatar, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import {  selectedConversationAtom } from '../atoms/ConversationAtom'

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
        p={2}
        >
            <Text maxW={"350px"} borderRadius={"md"} p={1} bg={"blue.400"}>
                {message.text}
            </Text>
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