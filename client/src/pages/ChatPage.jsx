import { Container, Box } from "@chakra-ui/react";
import { ChatState } from "./../context/ChatProvider";
import React, { useState } from "react";
import NavBar from "./../components/miscellaneous/NavBar";
import MyChats from "@/components/miscellaneous/MyChats";
import ChatBox from "@/components/miscellaneous/ChatBox";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Container
      // bg="white"
      height="85vh"
      width="1280px"
      margin="60px auto"
      padding={0}
      display="flex"
      flexDirection="column"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Box
        bg="bg.subtle"
        width="100%"
        height="90px"
        marginBottom="24px"
        display="flex"
        alignItems="center"
        // justifyContent="space-between"
      >
        {user && <NavBar />}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        height="80%"
        // flexDirection="row"
      >
        <Box width="30%">{user && <MyChats fetchAgain={fetchAgain} />}</Box>
        <Box width="68%">
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ChatPage;
