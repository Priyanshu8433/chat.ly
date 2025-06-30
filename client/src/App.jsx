import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { Button } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import "./axiosConfig";

import { Box } from "@chakra-ui/react";

import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <Box className="App" focusRingColor={"teal.subtle"}>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </Box>
  );
};

export default App;
