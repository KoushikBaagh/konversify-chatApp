/* eslint-disable */
// import { Stack } from "@chakra-ui/layout";
import { Stack, HStack, VStack } from "@chakra-ui/react";
// import { Skeleton } from "@chakra-ui/skeleton";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
    </Stack>
  );
};

export default ChatLoading;
