import { Avatar, AvatarBadge, Flex, Stack, WrapItem, useColorModeValue,Text,Image} from '@chakra-ui/react'
import React from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import userAtom from "../atoms/userAtom.js"
import {BsCheck2All } from "react-icons/bs"
import { selectedConversationAtom } from '../atoms/ConversationAtom.js'
function Conversation({conversation,isOnline}) {
    const user = conversation.participants[0]
    const lastmessage=conversation.lastmessage
  const [selectedConversation , setselectedConversation]= useRecoilState(selectedConversationAtom)
    const Currentuser= useRecoilValue(userAtom)
    // console.log(selectedConversation);
  return (
        <Flex
        alignItems={"center"}
        gap={4}
        p={1}
        _hover={{
            cursor: 'pointer',
            bg: useColorModeValue("gray.600","gray.dark"),
            color:"white",
        }}
        borderRadius={"md"}
        onClick={()=> setselectedConversation({
            _id: conversation._id,
            userId: user._id,
            username: user.username,
            profilepic: user.profilepic,
            mock:conversation.mock
           
        })}
        >
            <WrapItem>
                <Avatar size={{
                    base:"xs",
                    sm:"sm",
                    md:"md",
                }}
                src={user.profilepic}
                >
                {isOnline?<AvatarBadge boxSize={"1em"} bg={"green.500"}/>:""}
                </Avatar>
            </WrapItem>
            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight="700" display={"flex"} alignItems={"center"}>
                    {user.username} <Image  src="verified.png"  w={4} h={4} ml={1} />
                </Text>
                <Text fontSize="xs" display={"flex"} alignItems={"center"}>
                    {lastmessage.sender === Currentuser._id? <BsCheck2All size={16}/>:""}
                    {lastmessage.text.length>12?lastmessage.text.substring(0,12)+   "..." :lastmessage.text}
                </Text>
            
            </Stack>
        </Flex>
  )
}

export default Conversation