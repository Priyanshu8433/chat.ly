import React, { useEffect, useRef } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { Box, Avatar, Text } from "@chakra-ui/react";
import { ChatState } from "@/context/ChatProvider";
import { shouldDisplayAvatar } from "@/utils/getAvatarVisibility";

const ScrollableChat = ({ messages }) => {
  const messageEndRef=useRef(null);
  const scrollToEnd=()=>{
    messageEndRef.current?.scrollIntoView({behavior: "smooth"});
  }
  useEffect(()=>{
    scrollToEnd();
  },[messages])
  const { user } = ChatState();
  return (
    <Box
      display={"flex"}
      gap={"8px"}
      flexDirection={"column"}
      height={"540px"}
      overflowY={"scroll"}
      padding={"0 15px 0 5px"}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray.300",
          borderRadius: "24px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "gray.400",
        },
      }}
    >
      {messages &&
        messages.map((mess, i) => (
          <Box
            display={"flex"}
            gap={"8px"}
            alignItems={"center"}
            key={mess._id}
          >
            {shouldDisplayAvatar(messages,mess,i,user.data.user._id) ? (
              <Tooltip
                content={mess.sender.name}
                positioning={{ offset: { mainAxis: 4, crossAxis: 4 } }}
              >
                <Avatar.Root colorPalette={"teal"}>
                  <Avatar.Fallback name={mess.sender.name} />
                  {mess.sender.pic !==
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" && (
                    <Avatar.Image src={mess.sender.pic} />
                  )}
                </Avatar.Root>
              </Tooltip>
            ) : (
              <Box height={"40px"} width={"40px"}></Box>
            )}

            <Text
              marginLeft={`${
                mess.sender._id === user.data.user._id ? "auto" : "0px"
              }`}
              style={{
                background: `${
                  mess.sender._id === user.data.user._id ? "#14b8a6" : "#16a34a"
                }`,
                borderRadius: "1000px",
                padding: "0 10px",
                maxWidth: "75%",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {mess.content}
            </Text>
          </Box>
        ))}
        <div ref={messageEndRef}/>
    </Box>
  );
};

export default ScrollableChat;
