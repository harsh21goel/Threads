import React from 'react'
import SignupCard from '../components/SignUpCard'
import { useRecoilValue } from 'recoil'
import authScreenatom from "../atoms/Authatom"
import LoginCard from "../components/LoginCard"

function Authenticate() {   
    const authScreenState=useRecoilValue(authScreenatom)
    // console.log(authScreenState);
  return (
  <>
  {authScreenState === "login"? <LoginCard/>:<SignupCard/>}
  </> 
  )
}

export default Authenticate