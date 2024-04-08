import { Button, Container } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Authenticate from "./pages/Authenticate";
import LoginCard from "./components/LoginCard"
function App() {
  return (
    <>
      <Container maxW="620px">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/auth" element={<Authenticate/>} />
          <Route path="/login" element={<LoginCard/>} />




          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
