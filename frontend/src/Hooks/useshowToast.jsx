import React from 'react'
import {useToast} from "@chakra-ui/react"
function useshowToast() {
    const toast =useToast()
const showToast=(title,description,status,)=>{
    toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
  
    })
}
  return showToast

}

export default useshowToast