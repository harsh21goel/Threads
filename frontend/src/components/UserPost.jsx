import {
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import Actions from "./Action";

function UserPost({ likes, replies, PostImg, PostTitle }) {
  const [liked, setliked] = useState(false);
  return (
    <Link to={"/markzukerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Mark Zukerberg" src="/zuck-avatar.png" />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              left={"4px"}
              bottom={"0px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                markzukerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>

            <Flex gap={4} alignItems={"center"} onClick={(e) => e.preventDefault()}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <Menu>
                <MenuButton>
                  <HiDotsHorizontal  />
                </MenuButton>
                <MenuList>
                  <MenuItem bg={"gray.dark"}>Save Post</MenuItem>
                  <MenuItem bg={"gray.dark"}>Delete Post</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{PostTitle}</Text>
          {PostImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px  solid"}
              borderColor={"gray.light"}
            >
              <Image src={PostImg} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            {/* <Actions liked={liked} setliked={setliked} /> */}
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} Likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default UserPost;
