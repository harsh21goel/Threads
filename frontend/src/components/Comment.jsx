import { Avatar, Divider, Flex,Text } from '@chakra-ui/react'


function Comment({reply}) {
  return (
    <>
    <Flex gap={4} py={2} my={2}w={"full"}>
    <Avatar src={reply.userProfilepic} size={"sm"}/>
    <Flex gap={1} width={"full"} flexDirection={"column"}>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}  >
            <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>
            
        </Flex>
        <Text>{reply.text}</Text>
        
    </Flex>
    </Flex>
    <Divider/>
    </>
  )
}

export default Comment