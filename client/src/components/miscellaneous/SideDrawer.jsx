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
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserItemList from "../UserItemList";

const SideDrawer = ({ user, isOpen, onClose }) => {
  const ref = useRef(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [loadingChat, setLoadingChat] = useState();

  const handleSearch = async () => {
    if (!search) {
      toaster.create({
        title: "Please enter a username",
        type: "error",
      });
      return;
    }
    console.log(user);

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
      console.log(searchResult);
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
                      {searchResult.map((user) => (
                        <UserItemList user={user} />
                      ))}
                    </Stack>
                  )}
                </Box>
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
