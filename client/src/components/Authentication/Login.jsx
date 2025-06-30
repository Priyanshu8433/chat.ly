import React, { useState } from "react";
import { Box, Input, Field, Button, Link } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [name,setName]=useEffect();

  const handleLogin = async () => {
    setLoading(true);
    console.log("button clickes");
    if (!email || !password) {
      toaster.create({
        title: "Please provide all fields",
        type: "error",
      });
      console.log("toast clickes");
      setLoading(false);
      return;
    }

    try {
      const config = {
        "Content-type": "application/json",
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      toaster.create({
        title: "Login Succesfull",
        type: "success",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (err) {
      toaster.create({
        title: `${err.response.data.message}`,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Box>
      <Field.Root required>
        <Field.Label margin="10px 0 0 0">
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="Enter your email"
          required
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field.Label margin="10px 0 0 0">
          Password <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          placeholder="••••••••"
          required
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field.Root>

      <Link
        href="#"
        variant="underline"
        colorPalette="teal"
        margin="40px 0 6px 0"
      >
        Forgot password?
      </Link>

      <Box display="flex" justifyContent="center">
        <Button width="100%" size="lg" loading={loading} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
