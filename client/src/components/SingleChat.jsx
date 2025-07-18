import { ChatState } from "@/context/ChatProvider";
import React, { useEffect, useRef, useState } from "react";
import { Box, Spinner, Input, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";

const SingleChat = () => {
  const socket = useRef(null);
  const selectedChatCompare = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, selectedChat} = ChatState();

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("setup", user.data.user);
    socket.current.on("connected", () => {
      setSocketConnected(true);
    });

    socket.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/messages/${selectedChat._id}`,
        config
      );
      setMessages(data.data.messages);

      if (socket && socketConnected) {
        socket.current.emit("join chat", selectedChat._id);
      }
    } catch (err) {
      console.error(err);
      err;
      toaster.create({
        title: err.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("working");
    fetchMessages();

    selectedChatCompare.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    const messageReceivedHandler = (newMessageReceived) => {
      if (
        !selectedChatCompare.current ||
        selectedChatCompare.current._id !== newMessageReceived.chat._id
      ) {
        // notification logic
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };

    socket.current.on("message received", messageReceivedHandler);

    return () => {
      socket.current.off("message received", messageReceivedHandler);
    };
  }, []);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const messageContent = newMessage;
        setNewMessage("");

        const { data } = await axios.post(
          `/api/messages`,
          {
            content: messageContent,
            chatId: selectedChat._id,
          },
          config
        );

        socket.current.emit("new message", data.data.message);
        setMessages((prevMessages) => [...prevMessages, data.data.message]);
      } catch (err) {
        toaster.create({
          title: err.message,
          type: "error",
        });
      }
    }
  };

  return (
    <Box
      display={"flex"}
      height={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"4px"}
    >
      {loading ? (
        <Spinner size={"xl"} alignSelf={"center"} justifySelf={"center"} />
      ) : (
        <Box
          height={"full"}
          width={"full"}
          display={"flex"}
          flexDirection={"column"}
          gap={"4px"}
        >
          <Box height={"full"} maxHeight={"full"}>
            <ScrollableChat messages={messages} />
          </Box>
          <Input
            placeholder="Message"
            size={"lg"}
            variant="subtle"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            onKeyDown={sendMessage}
          />
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;
