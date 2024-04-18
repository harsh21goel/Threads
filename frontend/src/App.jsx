import { Button, Container } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes,Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Authenticate from "./pages/Authenticate";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
function App() {
  const user=useRecoilValue(userAtom)
  // console.log(user);
  return (
    <>
      <Container maxW="620px">
        <Header/>
        <Routes>
          <Route path="/" element={user?<HomePage/>:<Navigate to="/auth" />} />
          <Route path="/auth" element={!user? <Authenticate/>: <Navigate to="/"/>} />  // for login and signup
          <Route path="/update" element={user? <UpdateProfilePage/>: <Navigate to="/auth"/>} />  

          <Route path="/:username" element={user?(
            <>
            <LogoutButton />
            <UserPage/>
            <CreatePost />
            </>
          ):(
            <UserPage/>
          )} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>

        
        
      </Container>
    </>
  );
}

export default App;
