import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { X } from "lucide-react";
import { ChatState } from "@/context/ChatProvider";

const UserTag = ({ user, handleFunction }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      bg={user._id === selectedChat.groupAdmin._id ? "red" : "teal"}
      display={"inline-flex"}
      marginX={2}
      marginBottom={"7px"}
      padding={"3px 6px"}
      borderRadius={"full"}
      gap={"2px"}
      onClick={handleFunction}
      _hover={{ cursor: "pointer" }}
    >
      <Text>{user.name}</Text>
      <X size={"20px"} />
    </Box>
  );
};

export default UserTag;
