import React, { useState } from "react";
import { Box, Input, Field, Button } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [name,setName]=useEffect();

  const handleSubmit = async () => {
    setLoading(true);
    console.log("button clickes");
    if (!name || !email || !password || !confirmPassword) {
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
        "/api/users/register",
        { name, email, password },
        config
      );

      toaster.create({
        title: "Registration Succesfull",
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
        <Field.Label>
          Username <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="Enter your username"
          required
          size="lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <Field.Label margin="10px 0 0 0">
          Confirm Password <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          placeholder="••••••••"
          required
          size="lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Field.Root>

      <Box display="flex" justifyContent="center" margin="40px 0 8px 0">
        <Button width="100%" size="lg" loading={loading} onClick={handleSubmit}>
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
