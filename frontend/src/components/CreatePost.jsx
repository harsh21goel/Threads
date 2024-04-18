import {useState,useRef} from "react";
import { Button, useColorModeValue, useDisclosure,FormControl,Textarea ,Text,Input,Flex,Image,CloseButton} from "@chakra-ui/react";
import { AddIcon, } from "@chakra-ui/icons";
import { BsImageFill } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useImagePreview from "../Hooks/useImagepreview"
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useshowToast from "../Hooks/useshowToast";
import postsAtom from "../atoms/Postatom";
import { useParams } from "react-router-dom";
function CreatePost() {
    const imageRef=useRef(null)
    const MaxChar=500
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText,setpostText] = useState("")
  const {handleImageChange,imageUrl,setimageUrl}=useImagePreview()
  const [remainingChar, setremainingChar] = useState(MaxChar)
  const [loading, setloading] = useState(false)
  const user=useRecoilValue(userAtom)
  const showToast = useshowToast()
const [posts,setposts]= useRecoilState(postsAtom)
const {username}=useParams()
  const handleChange=(e)=>{
    const inputText=e.target.value

    if(inputText.length>MaxChar){
        const truncatedText=inputText.slice(0,MaxChar)
        setpostText(truncatedText)
        setremainingChar(0)
    }else{
        setpostText(inputText)
        setremainingChar(MaxChar-inputText.length)
    }
  }
  const handleCreatePost= async()=>{
    setloading(true)
   try {

    const res=await fetch("/api/posts/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({postedBy:user._id,text:postText,img:imageUrl})
    })
    const data= await res.json()
    // console.log(data);
    if(data.error){
        showToast("Error",data.error,"error")
        return
    }
    showToast("success","post created successfully","success")
    if(username=== user.username){
    setposts([data,...posts])

    }
    onClose()
    setpostText("")
    setimageUrl("")

   } catch (error) {
    showToast("Error",error,"error")
    
   }finally{
    setloading(false)
   }

  }
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        
        bg={useColorModeValue("gray.300", "gray.dark")}
        size={"sm"}
        onClick={onOpen}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
                <FormControl>

                    <Textarea
                    placeholder="Post content goes here"
                    onChange={handleChange}
                    value={postText}
                    />
                     <Text
                     fontSize="xs"
                     fontWeight="bold"
                     textAlign={"right"}
                     m={1}
                     color={"gray.500"}
                     >
                        {remainingChar}/{MaxChar}
                     </Text>
                   <Input
                   type="file"
                   ref={imageRef}
                   hidden
                   onChange={handleImageChange}
                   />
                   <BsImageFill 
                   style={{marginLeft:"5px",cursor: "pointer",}}
                   size={16}
                   onClick={()=>imageRef.current.click()}
                   />
                </FormControl>
            
                {imageUrl && (
                    <Flex mt={5} w={"full"} position={"relative"}>
                        <Image src={imageUrl} alt="Selected image" />
                        <CloseButton
                        position="absolute"
                        bg="gray.800"
                        top="2"
                        right="2"

                        onClick={() =>{
                             setimageUrl("")
                            }}
                        />
                    </Flex>
                )}


          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
