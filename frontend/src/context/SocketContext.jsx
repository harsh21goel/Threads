import { createContext, useState, useEffect, useContext } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client"
import userAtom from "../atoms/userAtom";

const SocketContext= createContext()

export const useSocket=()=>{
    return useContext(SocketContext)
}


export const SocketContextProvider = ({children})=>{
const [socket, setsocket]= useState(null)
const user = useRecoilValue(userAtom)
useEffect(()=>{
    const socket = io("http://localhost:5000",{
        query:{
            userId:user?._id,
        }
    })

    setsocket(socket)
    return ()=> socket && socket.close()
},[user?._id])
    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )

}