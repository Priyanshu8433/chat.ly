import { Box, Button, Text, Menu, Portal, Avatar } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { ChevronDown, Search } from "lucide-react";

import React, { useState } from "react";
import { ChatState } from "./../../context/ChatProvider";

import ProfileModal from "./ProfileModal";
import SideDrawer from "./SideDrawer";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser, setChats, setSelectedChat } = ChatState();
  const [profileOpen, setProfileOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawer] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setChats([]);
    setSelectedChat(null);
    navigate("/");
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0 20px"
      >
        <Tooltip showArrow content="Click to search user">
          <Button
            variant="subtle"
            size="lg"
            onClick={() => {
              setSideDrawer(true);
            }}
          >
            <Search />
            Search
          </Button>
        </Tooltip>

        <Text fontSize="42px" fontWeight="semibold">
          Chat.ly
        </Text>

        <Menu.Root>
          <Menu.Trigger
            rounded="4px"
            focusRing="outside"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="10px"
            _hover={{ bg: "gray.subtle" }}
            transition="background 0.2s ease-in-out"
            padding="4px 8px"
            width="110px"
            cursor="pointer"
          >
            <ChevronDown />
            <Avatar.Root size="lg">
              <Avatar.Fallback name={user.data.user.name} />
              {user.data.user.pic !==
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
                <Avatar.Image src={user.data.user.pic} />
              )}
            </Avatar.Root>
          </Menu.Trigger>
          <Portal size="lg">
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="my-profile"
                  onClick={() => {
                    setProfileOpen(true);
                  }}
                >
                  My Profile
                </Menu.Item>
                <Menu.Item
                  value="logout"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
      <ProfileModal
        user={user.data.user}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
      <SideDrawer
        user={user}
        isOpen={sideDrawerOpen}
        onClose={() => setSideDrawer(false)}
      />
    </>
  );
};

export default NavBar;
