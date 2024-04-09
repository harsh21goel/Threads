import { atom } from "recoil";


const userAtom = atom({
    key: "userAtom",
    default: JSON.parse(localStorage.getItem("users-threads"))
})

export  default userAtom