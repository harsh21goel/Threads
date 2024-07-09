import { atom } from "recoil";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("users-threads");
  return user ? JSON.parse(user) : {
    name: '',
    username: '',
    email: '',
    bio: '',
    profilePic: '',
  };
};

const userAtom = atom({
  key: "userAtom",
  default: getUserFromLocalStorage(),
});

export default userAtom;
