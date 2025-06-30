import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  Input,
  Field,
  Button,
  Link,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import Login from "@/components/Authentication/Login";
import Signup from "@/components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);
  return (
    <Container w="xl" colorScheme="light">
      <Box bg="bg.subtle" margin="60px 0 30px 0" padding="10px">
        <Text
          textStyle="5xl"
          textAlign="center"
          fontFamily="Poppins"
          fontWeight={500}
        >
          Chat.ly
        </Text>
      </Box>

      <Box
        display="flex"
        bg="bg.subtle"
        justifyContent="center"
        padding={"50px 0"}
        borderRadius={7}
      >
        <Tabs.Root
          defaultValue="login"
          variant="enclosed"
          display="flex"
          alignItems="center"
          flexDirection="column"
          size="lg"
        >
          <Tabs.List
            rounded="l2"
            p="1"
            display="flex"
            gap="8"
            justifyContent="space-evenly"
            width={220}
            margin="10px"
          >
            <Tabs.Trigger value="signup">SignUp</Tabs.Trigger>
            <Tabs.Trigger value="login">Login</Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Box marginTop="20px" width={300}>
            <Tabs.Content value="signup">
              <Signup />
            </Tabs.Content>
            <Tabs.Content value="login">
              <Login />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default HomePage;
