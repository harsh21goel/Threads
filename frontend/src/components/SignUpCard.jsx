
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
     
  } from '@chakra-ui/react'
  import { useState} from 'react'
    
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {  useSetRecoilState } from 'recoil'
import authScreenatom from '../atoms/Authatom'
import useshowToast from '../hooks/useshowToast'
import userAtom from '../atoms/userAtom'
  
  export default function SignupCard() {
    const showToast=useshowToast()
    const [showPassword, setShowPassword] = useState(false)
    const setAuthscreen= useSetRecoilState(authScreenatom)
    const setUserAtom=useSetRecoilState(userAtom)
    const [inputs, setInputs]=useState({
      name:"",
      username: "",
      email: "",
      password: "",
    })
    const handleSignup=async()=>{
      // console.log(inputs)
      try {
        const res=await fetch("/api/users/signup",{
          method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(inputs)      
        });
        const data= await res.json();
        // 
        if (data.error) {
          showToast("Error", data.error,"error")
          return;
        }
        localStorage.setItem("user-threads",JSON.stringify(data))
        setUserAtom(data)
      } catch (error) {
        showToast("Error", error,"error")

        // console.log("Error in handleSignup" + ": " + error);
      }
    }
    return (
      <Flex
        
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
           
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="name" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" onChange={(e)=>setInputs({...inputs, name: e.target.value})}
                    value={inputs.fullname}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="username" isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input type="text" onChange={(e)=>setInputs({...inputs, username: e.target.value})} 
                    value={inputs.username}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>setInputs({...inputs, email:e.target.value})} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}
                  onChange={(e)=>setInputs({...inputs, password:e.target.value})}
                  value={inputs.password}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue("gray.600","gray.700")}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.700","gray.800"),
                  }}
                  onClick={handleSignup}
                  >
                  Sign up
                  {/* {console.log(inputs)} */}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link  color={'blue.400'}
                  onClick={()=>setAuthscreen("login")}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }