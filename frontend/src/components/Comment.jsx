import { Avatar, Flex,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import Actions from './Action';

function Comment({comment,createdat,userName,userAvatar,likes}) {
    const [liked,setliked]=useState(false)
  return (
    <>
    <Flex gap={4} py={2} my={2}w={"full"}>
    <Avatar src={userAvatar} size={"sm"}/>
    <Flex gap={1} width={"full"} flexDirection={"column"}>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}  >
            <Text fontSize={"sm"} fontWeight={"bold"}>{userName}</Text>
            <Flex gap={2} alignItems={"center "} >
                <Text fontSize={"sm"} color={"gray.light"}>{createdat}</Text>
                <HiDotsHorizontal/>
            </Flex>
        </Flex>
        <Text>{comment}</Text>
        <Actions liked={liked} setliked={setliked}/>
        <Text fontSize={"sm"} color={"gray.light"}>
            {likes + (liked? 1 : 0)}
        </Text>
    </Flex>
    </Flex>
    </>
  )
}

export default Comment