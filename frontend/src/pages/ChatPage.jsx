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
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationAtom, selectedConversationAtom } from "../atoms/ConversationAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";
function ChatPage() {
  const showtoast = useShowToast();
  const [loadingconversations, setloadingConversations] = useState(true);
  const [loadingSearch, setloadingSearch] = useState("");
  const [searchedText, setsearchedText] = useState("");
  const [conversations, setconversations] = useRecoilState(conversationAtom)
  const [selectedConversation, setselectedConversation] = useRecoilState(selectedConversationAtom)
  const currentuser = useRecoilValue(userAtom)
  const {onlineusers,socket}= useSocket()
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
  const handleConversationSearch= async(e)=>{
    e.preventDefault()
    setloadingSearch(true)
    try {
      const res  = await fetch(`api/users/profile/${searchedText}`)
      const searchedUser= await res.json()
      if (searchedUser.error) {
        showtoast("Error", searchedUser.error, "error");
        return;
      }
      if (searchedUser._id === currentuser._id)  {
        showtoast("Error", "You can't message yourself", "error")
        return
      }
      if(conversations.find(conversation => conversation.participants[0]._id===searchedUser._id)){
          setselectedConversation({
            _id: conversations.find(conversation => conversation.participants[0]._id===searchedUser._id)._id,
            userId: searchedUser._id,
            username: searchedUser.username,
            profilepic: searchedUser.profilepic,
            
          })
          return
      }
      const mockConversation={
        mock:true,
        lastmessage:{
          text:"",
          sender:"",
        },
        _id:Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilepic: searchedUser.profilepic,
          },
        ],
      }
      setconversations((prevconv)=>[...prevconv,   mockConversation])
    } catch (error) {
      showtoast("Error: " , error, "error")
    }finally{
      setloadingSearch(false)
    }
  }
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
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder="Serach for a user"  onChange={(e)=>setsearchedText(e.target.value)}/>
              <Button size={"sm"} onClick={handleConversationSearch} isLoading={loadingSearch}>
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
              return <Conversation key={conversation._id} conversation={conversation} 
              isOnline={onlineusers.includes(conversation.participants[0]._id)}
              />
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
