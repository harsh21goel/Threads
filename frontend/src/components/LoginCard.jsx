import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import authScreenatom from "../atoms/Authatom";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useshowToast from "../Hooks/useshowToast";
export default function SimpleCard() {
  const setAuthscreen = useSetRecoilState(authScreenatom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setloading] = useState(false)
  const [inputs, setinputs] = useState({
    username:"",
    password:""
  })
  const showToast=useshowToast()
const handleLogin=async()=>{
  // console.log(inputs);
  setloading(true)
 try {
 const res=await fetch("api/users/login",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify(inputs)
 })
 const data=await res.json()
//  console.log(data);
 if(data.error){
  showToast("Error",data.error,"error")
  return
 }
 localStorage.setItem("users-threads", JSON.stringify(data))
setUser(data)
 } catch (error) {
  showToast("Error " , error.message,"error")
 }finally{
  setloading(false)
 }
}
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>User Name</FormLabel>
              <Input type="text"  onChange={(e)=>setinputs({...inputs,username:e.target.value})}
              value={inputs.username}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"  onChange={(e)=>setinputs({...inputs,password:e.target.value})}
              value={inputs.password}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={useColorModeValue("gray.700", "gray.800")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.600", "gray.600"),
                }}
                onClick={handleLogin}
                isLoading={loading}
                loadingText="Logging in"
              >
                Log in
              </Button>
            </Stack>
            <Text align={"center"} size={"xs"}>
              Don&apos;t hv an account{" "}
              <Link color={"blue.400"} onClick={() => setAuthscreen("signup")} >
                Sign up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
