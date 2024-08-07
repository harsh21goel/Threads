import {  Flex ,Spinner} from '@chakra-ui/react'
import React, { useEffect,useState } from 'react'
import useshowToast from '../hooks/useshowToast'
import Post from '../components/Post'
import { useRecoilState, useRecoilValue } from 'recoil'
import postsAtom from '../atoms/Postatom'
function HomePage() {
  const showtoast= useshowToast()

// const [posts, setposts] = useRecoilState(postsAtom)
const [posts, setposts] =useState([])
const [loading, setloading] = useState(true)

useEffect(()=>{ 
const getFeed= async()=>{
  setloading(true)
  setposts([])
  try {
    const res = await fetch("/api/posts/feed")
    const data= await res.json()
    if (data.error) {
    showtoast( "Error",data.error,"error")
    return
    }
    setposts(data)
    // console.log(  data);
  } catch (error) {
    showtoast( "Error",error.message,"error")
  }finally{
    setloading(false)

  }
 
}
getFeed()
// console.log( typeof  posts)

},[showtoast,setposts])

  return (
   <>
   {loading&&(
  <Flex justifyContent={"center"} >
    <Spinner size={"xl"}/>
  </Flex>
   )}
   {!loading && posts.length===0 && <h1>You're not following anyone</h1>}

{posts.map((post)=>(
<Post key={post._id} post={post} postedBy={post.postedBy}/>
) )}
   </>
  )
}

export default HomePage