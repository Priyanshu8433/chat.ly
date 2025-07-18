import React, { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { ChatState } from "@/context/ChatProvider";
import { Box, Text, Button, Avatar } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import ChatListItem from "../ChatListItem";
import getSender from "./../../utils/getSender";
import GroupCreateModal from "./../GroupCreateModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    const userInfo = localStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo) : null;
    setLoggedUser(user);

    const fetchChats = async () => {
      if (!user || !user.token) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get("api/chats", config);
        setChats(data.data.chats);
      } catch (err) {
        console.log(err);
        toaster.create({
          title: err.message,
          type: "error",
        });
      }
    };

    fetchChats();
  }, [fetchAgain, user]);

  return (
    <Box
      bg={"bg.subtle"}
      height={"full"}
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      // overflow={"hidden"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        borderBottom={"2px solid gray"}
        padding={"0 0 10px 0"}
        margin={"0 0 15px 0"}
      >
        <Text fontSize={"24px"} fontWeight={"semibold"}>
          My Chats
        </Text>
        <GroupCreateModal>
          <Button variant={"subtle"}>
            <Plus /> Create group
          </Button>
        </GroupCreateModal>
      </Box>

      <Box flex="1" height={"full"} overflowY="scroll">
        {loggedUser &&
          chats.map((chat) => (
            <Box
              bg={
                selectedChat && chat._id === selectedChat._id
                  ? "teal.emphasized"
                  : "gray.subtle"
              }
              padding={"10px 5px"}
              display={"flex"}
              gap={"10px"}
              margin={"0 0 7px 0"}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedChat(chat);
              }}
              key={chat._id}
            >
              <Avatar.Root size={"xl"}>
                {/* {console.log(chat)} */}
                <Avatar.Fallback
                  name={
                    !chat.isGroupChat
                      ? getSender(loggedUser.data.user, chat.users).name
                      : ""
                  }
                />
                {!chat.isGroupChat &&
                  getSender(loggedUser.data.user, chat.users).pic !==
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
                    <Avatar.Image
                      src={getSender(loggedUser.data.user, chat.users).pic}
                    />
                  )}
              </Avatar.Root>
              <Box>
                <Text fontWeight={"medium"} color={"whiteAlpha.900"}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser.data.user, chat.users).name
                    : chat.chatName}
                </Text>
                <Text color={"whiteAlpha.600"} fontWeight={"light"}>
                  {chat.lastMessage}
                </Text>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default MyChats;
