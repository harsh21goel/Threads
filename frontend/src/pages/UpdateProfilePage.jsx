import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    
    Avatar,
    Center,
  } from '@chakra-ui/react'
import { useState,useRef } from 'react'
import {  useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
  import useImagepreview from "../Hooks/useImagepreview"
  import useshowToast from "../Hooks/useshowToast"
  export default function UpdateProfilePage() {
    const [user,setuser]=useRecoilState(userAtom)
    const fileref =useRef(null)
    const showToast=useshowToast()
    const {handleImageChange,imageUrl}=useImagepreview()
    // console.log(user);
    const [inputs, setinputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilepic: user.profilepic,
        password: "",
       
    })

    const handleSubmit=async(e)=>{
      e.preventDefault()
      try {
        const res =await fetch(`/api/users/update/${user._id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          
          body:JSON.stringify({...inputs, profilepic: imageUrl})
        })
        // console.log(res);
        if (!res.ok) {
          throw new Error("Failed to update profile")
      }
        const data=await res.json()
        if (data.error) {
          showToast("Error",data.error,"error")
          return
        }
        showToast("success","profile updated successfully","success")
        setuser(data)
        localStorage.setItem("users-threads",JSON.stringify(data))
      } catch (error) {
        showToast("Error",error.message, "error")
        console.log(error);
      }
    }
    return (
      <form onSubmit={handleSubmit}>
      <Flex
        
        align={'center'}
        justify={'center'}
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={imageUrl||user.profilepic} />
                
              </Center>
              <Center w="full">
                <Button w="full" onClick={()=>fileref.current.click()}>Change Avatar</Button>
              </Center>
              <Input type='file' hidden ref={fileref} onChange={handleImageChange}/>
            </Stack>
          </FormControl>
          <FormControl  >
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Jhon doe"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.name}
              onChange={(e)=>setinputs({...inputs, name:e.target.value})}
            />
          </FormControl>
          <FormControl  _readOnly>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="Jhon doe"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.username}
              onChange={(e)=>setinputs({...inputs, username:e.target.value})}
            />
          </FormControl>
          <FormControl  >
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={inputs.email}
              onChange={(e)=>setinputs({...inputs, email:e.target.value})}
            />
          </FormControl>
          <FormControl   >
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your bio..."
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.bio}
              onChange={(e)=>setinputs({...inputs, bio:e.target.value})}
            />
          </FormControl>
          <FormControl  >
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              value={inputs.password}
              onChange={(e)=>setinputs({...inputs, password:e.target.value})}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'green.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'green.500',
              }}
              type='submit'
              >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </form>
    )
  }