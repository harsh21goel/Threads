import {
  Avatar,
  Box,
  Flex,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState,useEffect, } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Actions from "./Action";
import useshowToast from "../Hooks/useshowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { MdOutlineDelete } from "react-icons/md";
function Post({ post, postedBy }) {
  const [user, setuser] = useState("")
  const showToast = useshowToast();
  const navigate=useNavigate()
  const currentuser=useRecoilValue(userAtom)
  useEffect(() => {

    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();
        // console.log(data);
        if (data.error) {
     showToast("Error", data.error, "error");
          return
        }
        setuser(data)
      } catch (error) {
        showToast("Error", error.message, "error");
        setuser(null);
      }
    };
    getUser();
  }, [showToast,postedBy]);
  const handleDeletePost= async (e)=>{
    e.preventDefault()
    if(!window.confirm("Are you sure you want to delete this post")) return
    try {
      const res = await fetch(`/api/posts/${post._id}`,{
        method:"DELETE",
      })
      const data = await res.json();
      if (data.error) {
        showToast("Error",datat.error,"error")
        return
      }
      showToast("Success","Post Deleted","success")
    } catch (error) {
      showToast("Error", error.message, "error");
    }

  }

  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name={user?.fullname} src={user?.profilepic} 
          onClick={(e)=>{
            e.preventDefault();
            navigate(`/${user.username}`)
          }}
          />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length ===0 && <Text textAlign={"center"}>🥱</Text>}
            {post.replies[0]&&(
               <Avatar
               size={"xs"}
               name="John Doe"
               src={post.replies[0].userProfilepic}
               position={"absolute"}
               top={"0px"}
               left={"15px"}
               padding={"2px"}
             />
            )}
            {post.replies.length[1] && (
               <Avatar
               size={"xs"}
               name="John Doe"
               src={post.replies[1].userProfilepic}
               position={"absolute"}
               bottom={"0px"}
               right={"-5px"}
               padding={"2px"}
             />
            )}
           {post.replies[2] &&(
              <Avatar
              size={"xs"}
              name="John Doe"
              src={post.replies[2].userprofilepic}
              position={"absolute"}
              left={"4px"}
              bottom={"0px"}
              padding={"2px"}
            />
           )}
            
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}
               onClick={(e)=>{
                e.preventDefault();
                navigate(`/${user.username}`)
              }}>
                {user?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>

            <Flex
              gap={4}
              alignItems={"center"}
              onClick={(e) => e.preventDefault()}
            >
              <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                {formatDistanceToNow(new Date(post.createdAt) )} ago
              </Text>

              {currentuser?._id=== user._id && (
                <MdOutlineDelete size={15} onClick={handleDeletePost}/>
              )}
              <Menu>
                <MenuButton>
                </MenuButton>
                <MenuList>
                  <MenuItem bg={"gray.dark"}>Save Post</MenuItem>
                  <MenuItem bg={"gray.dark"}>Delete Post</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px  solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>

        
        </Flex>
      </Flex>
    </Link>
  );
}

export default Post;
