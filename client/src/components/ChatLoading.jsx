import React from "react";
import {
  VStack,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <VStack alignItems={"flex-start"} gap={"5"}>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
      <HStack gap="5" width={"100%"}>
        <SkeletonCircle size="12" />
        <Stack flex="1" width="100px">
          <Skeleton height="5" width="100%" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
    </VStack>
  );
};

export default ChatLoading;
