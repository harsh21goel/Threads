import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect ,useState} from "react";
import { CiSearch } from "react-icons/ci";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../Hooks/useshowToast";
import { useRecoilState } from "recoil";
import { conversationAtom, selectedConversationAtom } from "../atoms/ConversationAtom";
function ChatPage() {
  const showtoast = useShowToast();
  const [loadingconversations, setloadingConversations] = useState(true);
  const [conversations, setconversations] = useRecoilState(conversationAtom)
  const [selectedConversation, setselectedConversation] = useRecoilState(selectedConversationAtom)
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await fetch("api/messages/conversation");
        const data = await res.json();
        if (data.error) {
          showtoast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setconversations(Array.isArray(data) ? data : []);
      } catch (error) {
        showtoast("Error", error.message, "error");
      }finally{
        setloadingConversations(false)
      }
    };
    getConversation();
  }, [showtoast]);
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
      <Flex
        gap={4}
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
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{
            sm: "250px",
            md: "full",
          }}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your conversation
          </Text>
          <form>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder="Serach for a user" />
              <Button size={"sm"}>
                {" "}
                <CiSearch />{" "}
              </Button>
            </Flex>
          </form>
          {loadingconversations &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={"1"}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={"10"} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}
          {!loadingconversations && (
            conversations.map((conversation)=>{
              return <Conversation key={conversation._id} conversation={conversation}/>
            })
          )}
        </Flex>
          {!selectedConversation._id && (
            
            <Flex
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
        </Flex>
        )}
        {selectedConversation._id && <MessageContainer />}
        
      </Flex>
    </Box>
  );
}

export default ChatPage;
