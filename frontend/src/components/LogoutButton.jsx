import React from 'react'
import {Button} from "@chakra-ui/react"
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useshowToast from '../Hooks/useshowToast'
import { MdLogout } from "react-icons/md";
function LogoutButton() {
    const setUserState=useSetRecoilState(userAtom)
    const showToast=useshowToast()
const handleLogout = async() => {
    try {
       const res=await fetch("api/users/logout",{
            method:'POST',
            headers: {
                "content-type": "application/json",
            },
        })
        const data=await res.json()
        console.log(data);
        if (data.error) {
            showToast("Error", data.error,"error")
            return
        }
        localStorage.removeItem("users-threads")
        setUserState(null)
    } catch (error) {
        showToast("Error", error,"error")

        // console.log("Error in logoutButton  " +error);
    }
}

  return (
    <Button
    position="fixed"
    top={"30px"}
    right={"30px"}
    size={"sm"}
    onClick={handleLogout}
    >
     <MdLogout size={20}/>
    </Button>
  )
}

export default LogoutButton