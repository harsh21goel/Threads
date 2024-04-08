
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
    Link
  } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import authScreenatom from '../atoms/Authatom'
  
  export default function SimpleCard() {
   const setAuthscreen= useSetRecoilState(authScreenatom)
    return (
      <Flex
        
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Login</Heading>
           
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={{
                base:"full",
                sm:"400px",

            }}
            >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>User Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.400'}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={useColorModeValue("gray.700","gray.800")}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.600","gray.600"),
                  }}>
                  Log in
                </Button>

              </Stack>
              <Text align={"center"} size={"xs"}>
                Don&apos;t hv an account <Link color={"blue.400"}
                onClick={()=>setAuthscreen("signup")}>Sign up</Link>
                </Text>
            </Stack>
            

          </Box>
        </Stack>
      </Flex>
    )
  }
  