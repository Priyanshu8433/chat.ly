import React, { useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Input,
  InputGroup,
  Group,
  Box,
  VStack,
  Stack,
  HStack,
  Skeleton,
  SkeletonCircle,
  Spinner,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserItemList from "../UserItemList";
import { ChatState } from "@/context/ChatProvider";

const SideDrawer = ({ user, isOpen, onClose }) => {
  const ref = useRef(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { setSelectedChat, chats, setChats } = ChatState();

  const accessChats = async (userId) => {
    try {
      setLoadingChat(true);

      const existingChat = chats.find(
        (c) => c.users && c.users.some((user) => user._id === userId)
      );

      if (existingChat) {
        setSelectedChat(existingChat);
        setLoadingChat(false);
        onClose();
        return;
      }

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("api/chats", { userId }, config);
      setSelectedChat(data.data.Chat);
      // console.log(data.data.Chat);
      console.log(chats);
      if (!chats.find((c) => c._id === data.data.Chat._id)) {
        console.log(data);
        console.log(data.data);
        setChats([data.data.Chat, ...chats]);
      }
      setLoadingChat(false);
      onClose();
    } catch (err) {
      console.log(err);
      toaster.create({
        title: err.message,
        type: "error",
      });
    }
    setLoadingChat(false);
  };

  const handleSearch = async () => {
    if (!search) {
      toaster.create({
        title: "Please enter a username",
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

      const { data } = await axios.get(`/api/users?search=${search}`, config);
      setLoading(false);
      setSearchResult(data.data.users);
    } catch (err) {
      console.log(err);
      toaster.create({
        title: err.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <Drawer.Root
        open={isOpen}
        onOpenChange={onClose}
        placement={"start"}
        initialFocusEl={() => ref.current}
        size={"sm"}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Search users</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Group maxW="sm">
                  <InputGroup startElement={<Search size="20px" />}>
                    <Input
                      placeholder="username"
                      ref={ref}
                      focusRingColor={"teal.focusRing"}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      size={"lg"}
                    />
                  </InputGroup>
                  <Button
                    bg="bg.subtle"
                    variant="outline"
                    onClick={handleSearch}
                    focusRingColor={"teal.focusRing"}
                    loading={loading}
                    size={"lg"}
                  >
                    Search
                  </Button>
                </Group>
                <Box margin={"20px 0 0 0"}>
                  {loading ? (
                    <ChatLoading />
                  ) : (
                    <Stack gap={3}>
                      {searchResult.map((el) => (
                        <UserItemList
                          key={el._id}
                          user={el}
                          handleFunction={() => {
                            accessChats(el._id);
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
                {loadingChat && <Spinner />}
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </div>
  );
};

export default SideDrawer;
