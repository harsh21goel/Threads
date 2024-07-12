import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

import Actions from "../components/Action";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useNavigate, useParams } from "react-router-dom";
import useshowToast from "../hooks/useshowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/Postatom";

function PostPage() {
  const { pid } = useParams();
  const showtoast = useshowToast();
  const [posts, setposts] = useRecoilState(postsAtom);
  const currentuser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const currentpost=posts[0]
  useEffect(() => {
    const getpost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          return showtoast("Error", data.error, "error");
        }
        // console.log(data)

        setposts([data]);
      } catch (error) {
        showtoast("Error", error.message, "error");
      }
    };
    getpost();
  }, [showtoast, pid,setposts]);
  const { user, loading } = useGetUserProfile();

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!currentpost) return null;

  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this post")) return;
    try {
      const res = await fetch(`/api/posts/${currentpost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showtoast("Error", datat.error, "error");
        return;
      }
      showtoast("Success", "Post Deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showtoast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilepic} size={"md"} name="Mark Zukerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(currentpost.createdAt))} ago
          </Text>

          {currentuser?._id === user._id && (
            <MdOutlineDelete
              size={15}
              cursor={"pointer"}
              onClick={handleDeletePost}

            />
          )}
        </Flex>
      </Flex>

      <Text my={3}>{currentpost.text}</Text>

      {currentpost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px  solid"}
          borderColor={"gray.light"}
        >
          <Image src={currentpost.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentpost} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like,reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />

      {currentpost.replies.map((reply) => {
        return <Comment key={reply._id} reply={reply} />;
      })}

    </>
  );
}

export default PostPage;
