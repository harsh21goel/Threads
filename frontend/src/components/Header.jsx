import { Flex, Image, useColorMode,Link } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink } from 'react-router-dom'
import {AiFillHome} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"
import { IoChatbubblesOutline } from "react-icons/io5";
function Header() {
   const user=useRecoilValue(userAtom)
    const{colorMode,toggleColorMode}=useColorMode()
  return (
    <>
    <Flex justifyContent={"space-between"} mt={6} mb={12}>

    {user && (
      <Link as={RouterLink} to={"/"} >
        <AiFillHome size={24} />
      </Link>
    )}
        <Image
        cursor={"pointer"}
        alt='logo'
        w={6}
        justifyItems={"center"}
        src={colorMode=== "dark"? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
        />

{user && (
  <Flex alignItems={"center"} gap={4}>
     <Link as={RouterLink} to={user ? `/${user.username}` : "#"}>
        <RxAvatar size={24} />
      </Link>
     <Link as={RouterLink} to={`/chat`}>
        <IoChatbubblesOutline size={24} />
      </Link>
      
    
    </Flex>
)}
    </Flex>
    </>
  )
}

export default Header