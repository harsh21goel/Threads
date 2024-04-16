import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
Link,
  Menu,
  MenuButton,
  Portal,
  MenuItem,
  MenuList,
  useToast,
  Button
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useshowToast from "../Hooks/useshowToast";
function UserHeader({user}) {
  const showtoast= useshowToast()
  const toast = useToast();
const currentUser=useRecoilValue(userAtom)
const [following,setfollowing]=useState(user.followers.includes(currentUser?._id))
const [updating,setupdating]=useState(false)
// console.log(following);
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        description: "Url Copied",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };
 

  const handleFollow= async () => {
    if(!currentUser){
      showtoast("Error", "Login to follow", "error")
  return
    }
    if(updating)return
    setupdating(true)
    try {
      const res= await fetch(`/api/users/follow/${user._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
      })
      const data = await res.json()
      console.log(data);
      if(data.error){
        showtoast("Error",data.error,"error")
        return
      }
      if (following) {
        showtoast("Success",`Unfollowed ${user.name}`,"success")
        user.followers.pop()
      } else {
        showtoast("success",`Followed ${user.name}`,"success")
        user.followers.push(currentUser?._id);
      }
      setfollowing(!following)
    } catch (error) {
      showtoast("Error",data.error,"error")
      
    }finally{
      setupdating(false)

    }
  }
  return (
    <>
      <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {user.name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={{  base:"xs",
              md:"sm",
              lg:"md",}}>{user.username}</Text>
              <Text
                fontSize={"xs"}
                bg={"gray.dark"}
                color={"gray.light"}
                p={1}
                borderRadius={"full"}
              >
                threads.net
              </Text>
            </Flex>
          </Box>
          <Box>
          {user.profilepic &&(
              <Avatar name={user.name} src={user.profilepic} size={{
                base:"md",
                md:"lg",
                lg:"xl",
                xl:"2xl",
                "2xl":"3xl",
                "3xl":"4xl",
                "4xl":"5xl",
                "5xl":"6xl",
                "6xl":"7xl",
              }} />
          )}
          {!user.profilepic && (
              <Avatar name={user.name} src="https://bit.ly/broken-link" size={{
                base:"md",
                md:"lg",
                lg:"xl",
                xl:"2xl",
              
              }} />
          )}
          </Box>
        </Flex>
        <Text fontSize={{ base:"xs",
              md:"sm",
              lg:"md",

        }}>{user.bio}</Text>

        {user._id === currentUser?._id && (
          <RouterLink to="/update">
            <Button size={"sm"}>Update profile</Button>
          </RouterLink>
        )}
        {user._id !== currentUser?._id && (
          
            <Button size={"sm"} onClick={handleFollow} isLoading={updating}>{following? "Unfollow":"Follow"}</Button>
          
        )}
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>{user.followers.length} followers</Text>
            <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>instagram.com</Link>
          </Flex>
          <Flex>
            <Box className="icon-container">
              <FaInstagram size={24} cursor="pointer" />
            </Box>
            <Box className="icon-container">
              <Menu >
                <MenuButton>
                  <HiDotsHorizontal size={24} cursor="pointer"  />
                </MenuButton>
                <Portal>
                  <MenuList bg={"gray.dark"}>
                    <MenuItem bg={"gray.dark"} onClick={copyUrl}>
                      {" "}
                      Copy link
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
       
          <Flex w={"full"}>
            <Flex
              flex={1}
              borderBottom={"1.5px solid white"}
              justifyContent={"center"}
              pb="3"
              cursor={"pointer"}
            >
              <Text fontWeight={"bold"}>Threds</Text>
            </Flex>
            <Flex
              flex={1}
              borderBottom={"1px solid gray"}
              color={"gray.light"}
              justifyContent={"center"}
              pb="3"
              cursor={"pointer"}
            >
              <Text fontWeight={"bold"}>Replies</Text>
            </Flex>
          </Flex>
        
      </VStack>
    </>
  );
}

export default UserHeader;
