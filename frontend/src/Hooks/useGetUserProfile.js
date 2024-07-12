import React, { useEffect,useState } from 'react'
import useshowToast from '../hooks/useshowToast';
import { useParams } from 'react-router-dom';

function useGetUserProfile() {
    const [loading, setloading] = useState(true)
    const [user, setuser] = useState(null)
    const showtoast =useshowToast()
    const {username}=useParams()


    useEffect(()=>{
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

          getuser();
        
    },[username,showtoast])
   
 return  {loading,user}
}

export default useGetUserProfile