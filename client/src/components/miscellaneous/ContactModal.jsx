import React, { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Avatar,
  Text,
  Input,
  Group,
  InputGroup,
} from "@chakra-ui/react";
import { ChatState } from "@/context/ChatProvider";
import getSender from "@/utils/getSender";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import UserItemList from "../UserItemList";
import { Search } from "lucide-react";
import UserTag from "../UserTag";

const ContactModal = ({ children, fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [groupName, setGroupName] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState();

  const handleAddUser = async (user1) => {
    setLoading(true);
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toaster.create({
        description: "User already in group!",
        type: "error",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user.data.user._id) {
      toaster.create({
        description: "Only admin can add users",
        type: "error",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "api/chats/groupadd",
        {
          userId: user1._id,
          chatId: selectedChat._id,
        },
        config
      );

      setSelectedChat(data.data.chat);
      setFetchAgain(!fetchAgain);
      toaster.create({
        description: "Succesfully added!",
        type: "success",
      });
    } catch (err) {
      toaster.create({
        description: err.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleRemoveUser = async (user1) => {
    setLoading(true);
    if (selectedChat.groupAdmin._id === user1._id) {
      toaster.create({
        description: "Admin cannot leave",
        type: "error",
      });
      return;
    }
    if (
      selectedChat.groupAdmin._id !== user.data.user._id &&
      user1._id !== user.data.user._id
    ) {
      toaster.create({
        description: "Only admin can remove",
        type: "error",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "api/chats/groupremove",
        {
          userId: user1._id,
          chatId: selectedChat._id,
        },
        config
      );

      user1._id === user.data.user._id
        ? setSelectedChat()
        : setSelectedChat(data.data.chat);
      setFetchAgain(!fetchAgain);
      const msg =
        user1._id === user.data.user._id
          ? "Succesfully left"
          : "Succesfully removed";
      toaster.create({
        description: msg,
        type: "success",
      });
    } catch (err) {
      toaster.create({
        description: err.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    if (!query) {
      setLoading(false);
      setSearchResults([]);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/users?search=${query}`, config);
      setSearchResults(data.data.users);
    } catch (error) {
      toaster.create({
        title: error.message,
        type: error,
      });
    }
    setLoading(false);
  };

  const handleRename = async () => {
    if (!groupName) {
      toaster.create({
        description: "Group name can't be empty",
        type: "error",
      });
      return;
    }

    if (user.data.user._id != selectedChat.groupAdmin._id) {
      toaster.create({
        description: "Only Admin can rename the group",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "api/chats/rename",
        {
          chatName: groupName,
          chatId: selectedChat._id,
        },
        config
      );
      setSelectedChat(data.data.chat);
      setFetchAgain(!fetchAgain);
      toaster.create({
        description: "Succesfully renamed group",
        type: "success",
      });
      setGroupName("");
    } catch (err) {
      toaster.create({
        description: err.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Box _hover={{ cursor: "pointer", bg: "gray.800" }}>
      <Dialog.Root>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  {selectedChat.isGroupChat ? "Group Info" : "Contact Profile"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {selectedChat.isGroupChat ? (
                  <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                    <Group attached w="100%">
                      <Input
                        flex="1"
                        placeholder="Update Group name"
                        value={groupName}
                        size={"lg"}
                        onChange={(e) => {
                          setGroupName(e.target.value);
                        }}
                      />
                      <Button
                        bg="bg.subtle"
                        size={"lg"}
                        variant="outline"
                        onClick={handleRename}
                      >
                        Rename
                      </Button>
                    </Group>
                    <InputGroup startElement={<Search />} margin={"0 0 10px 0"}>
                      <Input
                        placeholder="Search users"
                        size={"lg"}
                        onChange={(e) => {
                          handleSearch(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <Box>
                      {selectedChat.users.map((u) => (
                        <UserTag
                          key={u._id}
                          user={u}
                          handleFunction={() => {
                            handleRemoveUser(u);
                          }}
                        />
                      ))}
                    </Box>
                    <Box>
                      {searchResults &&
                        searchResults.map((el) => (
                          <UserItemList
                            key={el._id}
                            user={el}
                            handleFunction={() => handleAddUser(el)}
                          />
                        ))}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"24px"}
                    alignItems={"center"}
                  >
                    <Box>
                      <Box height={"150px"} aspectRatio={"square"}>
                        <Avatar.Root size="full">
                          <Avatar.Fallback
                            name={
                              getSender(user.data.user, selectedChat.users).name
                            }
                            fontSize={"48px"}
                          />
                          {user.data.user.pic !==
                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
                            <Avatar.Image
                              src={
                                getSender(user.data.user, selectedChat.users)
                                  .pic
                              }
                            />
                          )}
                        </Avatar.Root>
                      </Box>
                    </Box>
                    <Text fontSize={"24px"}>
                      {getSender(user.data.user, selectedChat.users).email}
                    </Text>
                  </Box>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                {selectedChat.isGroupChat ? (
                  <Button
                    variant={"outline"}
                    colorPalette={"red"}
                    onClick={() => {
                      handleRemoveUser(user.data.user);
                    }}
                  >
                    Leave Group
                  </Button>
                ) : (
                  <></>
                )}
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default ContactModal;
