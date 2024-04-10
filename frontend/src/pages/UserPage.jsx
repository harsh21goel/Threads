import React, { useState ,useEffect} from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useshowToast from '../Hooks/useshowToast'
function UserPage() {
  const showtoast=useshowToast()
  const [user, setuser] = useState(null)
  const {username}=useParams()
  useEffect(() => {
  const getuser=async ()=>{
    try {
      const res= await fetch(`/api/users/profile/${username}`)
    const data=await res.json()
    if (data.error) {
      showtoast("Error",data.error,"error")
      return
    }
    setuser(data)
    // console.log(data);

    } catch (error) {
      showtoast("Error",error,"error")

      // console.log(error);
    }
   
  }
  
  getuser()
  }, [username,showtoast])
  if(!user)return null
  return (
    <>
        <UserHeader user={user}/>
        <UserPost likes={4000} replies={125} PostImg="/post1.png" PostTitle="Let's talk about Threads" />
        <UserPost likes={8000} replies={250} PostImg="/post2.png" PostTitle="Let's talk about " />
        <UserPost likes={16000} replies={500} PostImg="/post3.png" PostTitle="This guy is alien ! " />
        <UserPost likes={32000} replies={1000}  PostTitle="How you doin?" />
       
    </>
  )
}

export default UserPage