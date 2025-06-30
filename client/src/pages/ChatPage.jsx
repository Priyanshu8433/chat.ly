import { Container, Box } from "@chakra-ui/react";
import { ChatState } from "./../context/ChatProvider";
import React from "react";
import NavBar from "./../components/miscellaneous/NavBar";

const ChatPage = () => {
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
        bg="blue"
        height="full"
        // flexDirection="row"
      >
        <Box bg="blue.400" width="30%">
          2
        </Box>
        <Box bg="pink.200" width="68%">
          3
        </Box>
      </Box>
    </Container>
  );
};

export default ChatPage;
