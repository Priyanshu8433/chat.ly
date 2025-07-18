import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { EllipsisVertical } from "lucide-react";
import { ChatState } from "@/context/ChatProvider";
import getSender from "@/utils/getSender";
import ContactModal from "./ContactModal";
import SingleChat from "../SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = ChatState();

  return (
    <Box height={"full"}>
      {!selectedChat ? (
        <Box
          bg={"bg.subtle"}
          height={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={"36px"} color={"gray.600"}>
            Select a contact to start talking
          </Text>
        </Box>
      ) : (
        <Box
          bg={"bg.subtle"}
          height={"full"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            className="Header"
            padding={"7px 15px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"28px"} fontWeight={"semibold"}>
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : getSender(user.data.user, selectedChat.users).name}
            </Text>
            <ContactModal
              selectedChat={selectedChat}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            >
              <EllipsisVertical />
            </ContactModal>
          </Box>
          <Box className="text-area" bg={"gray.800"} flex={"1"}>
            <SingleChat />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
