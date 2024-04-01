import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

function UserPage() {
  return (
    <>
        <UserHeader/>
        <UserPost likes={4000} replies={125} PostImg="/post1.png" PostTitle="Let's talk about Threads" />
        <UserPost likes={8000} replies={250} PostImg="/post2.png" PostTitle="Let's talk about " />
        <UserPost likes={16000} replies={500} PostImg="/post3.png" PostTitle="This guy is alien ! " />
        <UserPost likes={32000} replies={1000}  PostTitle="How you doin?" />
       
    </>
  )
}

export default UserPage