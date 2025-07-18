import React from "react";
import { Box, Text, Button, Avatar } from "@chakra-ui/react";
import { ChatState } from "@/context/ChatProvider";

const ChatListItem = ({ chat }) => {
  const { selectedChat, setSelectedChat } = ChatState();
  const handleSelect = (chat) => {
    setSelectedChat(chat);
  };
  return (
    <Box
      bg={chat === selectedChat ? "teal.subtle" : "gray.subtle"}
      padding={"10px 5px"}
      display={"flex"}
      gap={"10px"}
      margin={"0 0 7px 0"}
      _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }}
      onClick={handleSelect(chat)}
    >
      <Avatar.Root size={"xl"}>
        <Avatar.Fallback name={""} />
        {/* {chat.data.user.pic !==
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
          <Avatar.Image src={chat.data.user.pic} />
        )} */}
      </Avatar.Root>
      <Box>
        <Text fontWeight={"medium"} color={"whiteAlpha.900"}>
          {chat.chatName}
        </Text>
        <Text color={"whiteAlpha.600"} fontWeight={"light"}>
          {chat.lastMessage}
        </Text>
      </Box>
    </Box>
  );
};

export default ChatListItem;
