import React, { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useshowToast from "../Hooks/useshowToast";
import { Spinner, Flex } from "@chakra-ui/react";
import Post from "../components/Post";
function UserPage() {
  const showtoast = useshowToast();
  const [user, setuser] = useState(null);
  const { username } = useParams();
  const [loading, setloading] = useState(true);
const [posts, setposts] = useState([])
const [fetchingposts, setfetchingposts] = useState(true)
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
      } finally {
        setloading(false);
      }
    };
    const getPosts=async()=>{
      
      try {
        const res=await fetch(`/api/posts/user/${username}`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data=await res.json();
        if (data.error) {
          showtoast("Error" ,data.error,"error")
        return
        }
          setposts(data)
          // console.log(data);
      } catch (error) {
        showtoast("Error", error.message, "error");
      }finally{
        setfetchingposts(false)
        
      }
    }
    getPosts()
    getuser();
  }, [username, showtoast]);
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) {
    return <h1>User not found</h1>;
  }
  return (
    <>
      <UserHeader user={user} />

      {!fetchingposts && posts.length ===0 && <h1>This User not posted anything Yet</h1>}

      {fetchingposts && (
        <Flex justifyContent={"center"} my={12}>
        <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post)=>(
        
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  );
}

export default UserPage;
