import React, { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useshowToast from "../Hooks/useshowToast";
import {Spinner,Flex} from "@chakra-ui/react"
function UserPage() {
  const showtoast = useshowToast();
  const [user, setuser] = useState(null);
  const { username } = useParams();
  const [loading, setloading] = useState(true)
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showtoast("Error", data.error, "error");
          return;
        }
        setuser(data);
        // console.log(data);
      } catch (error) {
        showtoast("Error", error, "error");

        // console.log(error);
      }finally{
        setloading(false)
      }
    };

    getuser();
  }, [username, showtoast]);
  if (!user && loading){
     return (
      <Flex justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"xl"} />
          
      </Flex>
     )

  }
  if (!user && !loading){
    return (
     <h1>User not found</h1>
    )
  }
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={4000}
        replies={125}
        PostImg="/post1.png"
        PostTitle="Let's talk about Threads"
      />
      <UserPost
        likes={8000}
        replies={250}
        PostImg="/post2.png"
        PostTitle="Let's talk about "
      />
      <UserPost
        likes={16000}
        replies={500}
        PostImg="/post3.png"
        PostTitle="This guy is alien ! "
      />
      <UserPost likes={32000} replies={1000} PostTitle="How you doin?" />
    </>
  );
}

export default UserPage;
