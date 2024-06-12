import { Avatar, Flex, useColorModeValue,Text,Image, Divider, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React from 'react'
import Message from './Message'
import MessageInput from './MessageInput'

const MessageContainer = () => {
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
           <Avatar src=''  size={"sm"}/>
           <Text display={"flex"} alignItems={"center"}> 
            John doe <Image src="verified.png" w={4} h={4} ml={1} /></Text>
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
            {false &&
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
            <Message OwnMessage= {true}/>
            <Message OwnMessage= {false}/>
            <Message OwnMessage= {false}/>
            <Message OwnMessage= {true}/>
            <Message OwnMessage= {true}/>
            <Message OwnMessage= {false}/>
            <Message OwnMessage= {false}/>
            <Message OwnMessage= {true}/>
        </Flex>
        <MessageInput/>
    </Flex>
  )
}

export default MessageContainer