import { Avatar, Flex,Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({OwnMessage}) => {
  return (
    <>
    {OwnMessage ? (
        <Flex
        gap={2}
        alignSelf={"flex-end"}
        p={2}
        >
            <Text maxW={"350px"} borderRadius={"md"} p={1} bg={"blue.400"}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit aliquam a laborum aspernatur 
            </Text>
                <Avatar src='' w={7} h={7}/>
        </Flex>
    ):(
        <Flex
        gap={2}
        >
                <Avatar src='' w={7} h={7}/>

            <Text maxW={"350px"} borderRadius={"md"} p={1} bg={"gray.800"}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit aliquam a laborum aspernatur voluptatem consequuntur 
            </Text>
        </Flex>
    )}
    </>
  )
}

export default Message