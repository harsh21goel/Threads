import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Actions from "../components/Action";
import Comment from "../components/Comment";

function PostPage() {
  const [liked,setliked]=useState(false)
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zukerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              mark zukerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <HiDotsHorizontal />
        </Flex>
      </Flex>

      <Text my={3}>Lets talk about threads.</Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px  solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>

      <Flex gap={3} my={3} >
        <Actions liked={liked} setliked={setliked}/>
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}> 128 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked? 1 :0)} likes</Text>
      </Flex>
      <Divider my={4}/>

      <Flex justifyContent={"space-between"}>
      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"2xl"} >👋</Text>
        <Text color={"gray.light"} >Get the app to like,reply and post.</Text>

      </Flex>
      <Button>
        Get
      </Button>
      </Flex>
      <Divider my={4}/>
      <Comment
      comment="looks really good"
      createdat="1d"
      likes={150}
      userName="Johndoe"
      userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
      comment="Sick bro"
      createdat="2d"
      likes={50}
      userName="Shawn"
      userAvatar="https://bit.ly/sage-adebayo"
      />
      <Comment
      comment="Nice "
      createdat="5d"
      likes={100}
      userName="Davis"
      userAvatar="https://bit.ly/kent-c-dodds"
      />
      <Comment
      comment="Hola amigo"
      createdat="50m"
      likes={35}
      userName="Jerry"
      userAvatar="https://bit.ly/tioluwani-kolawole"
      />


    </>
  );
}

export default PostPage;
