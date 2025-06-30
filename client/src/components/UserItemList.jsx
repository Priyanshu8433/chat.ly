import React from "react";
import { Stack, HStack, Avatar, Text, Box } from "@chakra-ui/react";
import { ChevronDown, Search, Plus } from "lucide-react";

const UserItemList = ({ user }) => {
  return (
    <Box bg={"gray.subtle"} padding={"8px 16px"} rounded={5}>
      <HStack gap="5" width={"100%"}>
        <Avatar.Root height={"12"} width={"12"}>
          <Avatar.Fallback name={user.name} fontSize={"20px"} />
          {user.pic !==
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
            <Avatar.Image src={user.pic} />
          )}
        </Avatar.Root>
        <Stack flex="1" width="100px" gap={0}>
          <Text fontSize={"14px"}>{user.name}</Text>
          <Text fontWeight={"light"} color={"whiteAlpha.700"}>
            {user.email}
          </Text>
        </Stack>
        <Box _hover={{ bg: "whiteAlpha.200" }} padding={"4px"}>
          <Plus color="#2dd4bf" />
        </Box>
      </HStack>
    </Box>
  );
};

export default UserItemList;
