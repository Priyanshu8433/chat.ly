import React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";

const ProfileModal = ({ user, isOpen, onClose }) => {
  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  <Text fontSize={"24px"} fontWeight={"semibold"}>
                    Profile
                  </Text>
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body display="flex" alignItems="center" gap="30px">
                <Avatar.Root height={"80px"} width={"80px"}>
                  <Avatar.Fallback name={user.name} fontSize={35} />
                  {user.pic !==
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
                    <Avatar.Image src={user.pic} />
                  )}
                </Avatar.Root>
                <Box>
                  <Text fontSize="20px" margin={"0 0 10px 0"}>
                    {user.name}
                  </Text>
                  <Text fontSize={"16px"} fontWeight={"light"}>
                    {user.email}
                  </Text>
                </Box>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="lg" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
};

export default ProfileModal;
