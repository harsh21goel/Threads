import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";

function ChatPage() {
  return (
    <Box
      position={"absolute"}
      w={{
        base: "100%",
        md: "80%",
        lg: "720px",
      }}
      p={4}
      left={"50%"}
      transform={"translateX(-50%)"}
    >
      <Flex gap={4}
      flexDirection={{
        base: "column",
        md: "row",
      }}
      maxW={{
        sm: "400px",
        md: "full",
      }}
      mx={"auto"}
      >

        <Flex flex={30} gap={2}
        flexDirection={"column"} 
        maxW={{
          sm: "250px",
          md: "full",
        }}
        mx={"auto"}
        >

            <Text fontWeight={700} color={useColorModeValue("gray.600","gray.400")}>Your conversation</Text>
            <form>
              <Flex alignItems={"center"} gap={2}>
                <Input placeholder="Serach for a user"/>
                <Button size={"sm"}>    <CiSearch/>   </Button>
              </Flex>
            </form>
            {false &&
            [0,1,2,3,4].map((_,i)=>(
              <Flex key={i} gap={4} alignItems={"center"} p={"1"}borderRadius={"md"}>
                <Box >
                  <SkeletonCircle size={"10"}/>
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"}/>
                  <Skeleton h={"8px"} w={"90%"}/>
                </Flex>
              </Flex>
            ))}
            <Conversation />
            <Conversation />
            <Conversation />
            
        </Flex>
        {/* <Flex
        flex={70}
        flexDir={"column"}
        borderRadius={"md"}
        p={2}
        alignItems={"center"}
        justifyContent={"center"}
        height={"400px"}
        >
          <GiConversation size={100}/>
          <Text>
            Select message to start conversation
          </Text>
        </Flex> */}
        {/* <Flex flex={70}>Message Container</Flex> */}
        <MessageContainer/>

      </Flex>
    </Box>
  );
}

export default ChatPage;
