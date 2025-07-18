import React, { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Input,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Search } from "lucide-react";
import axios from "axios";
import { ChatState } from "@/context/ChatProvider";
import UserItemList from "./UserItemList";
import UserTag from "./UserTag";

const GroupCreateModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState();
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSubmit = async () => {
    setLoading(true);
    if (!groupName) {
      toaster.create({
        title: "Please enter a group name",
        type: "error",
      });
      setLoading(false);
    }

    const body = {
      chatName: groupName,
      users: selectedUsers.map((u) => u._id),
    };

    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chats/group`, body, config);
      console.log(data.data.chat);
      setChats([data.data.chat, ...chats]);
      setOpen(false);
      setGroupName("");
      setSearchResults([]);
      setSelectedUsers([]);
    } catch (err) {
      console.log(err);
      toaster.create({
        title: err.message,
        type: "error",
      });
    }

    setLoading(false);
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.find((u) => userToAdd._id === u._id)) {
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (user) => {
    const arr = selectedUsers.filter((u) => u._id !== user._id);
    setSelectedUsers(arr);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create new group</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {/* Input group name */}
              <Input
                placeholder="Enter group name"
                marginBottom={"20px"}
                size={"lg"}
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              {/* Input user search */}
              <InputGroup startElement={<Search />} margin={"0 0 10px 0"}>
                <Input
                  placeholder="Search users"
                  size={"lg"}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </InputGroup>
              {/* selected users tag */}
              {selectedUsers.map((u) => (
                <UserTag
                  key={u._id}
                  user={u}
                  handleFunction={() => {
                    handleDelete(u);
                  }}
                />
              ))}
              {/* search result */}
              {loading ? (
                <Spinner />
              ) : (
                searchResults.slice(0, 4).map((u) => (
                  <UserItemList
                    key={u._id}
                    user={u}
                    handleFunction={() => {
                      handleGroup(u);
                    }}
                  />
                ))
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handleSubmit} disabled={loading}>
                Create
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default GroupCreateModal;
