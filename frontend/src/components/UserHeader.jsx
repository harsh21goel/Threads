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
} from "@chakra-ui/react";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
function UserHeader() {
  const toast = useToast();
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
  return (
    <>
      <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Mark Zuckerburg
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={{  base:"xs",
              md:"sm",
              lg:"md",}}>markzuckerbug</Text>
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
            <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={{
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
          </Box>
        </Flex>
        <Text fontSize={{ base:"xs",
              md:"sm",
              lg:"md",

        }}>Co-founder,excecutive,chairman and CEO of Meta platforms.</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>3.2k followers</Text>
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
