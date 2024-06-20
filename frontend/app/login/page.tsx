"use client";

import { Box, Button, Link, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    axios({
      method: "post",
      url: "http://tagnotes/api/login",
      data: { name: username, password: password },
      headers: { "Content-Type": "application/json" },
    })
      .then(() => (window.location.href = "/notes"))
      .catch((e) => console.log(e));
  };

  return (
    <Box alignItems="center" justifyContent="center" height="100vh">
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <TextField
          label="Username"
          type={"text"}
          placeholder="Username"
          variant="outlined"
          required={true}
          onChange={(t) => setUsername(t.target.value)}
        />
        <TextField
          label="Password"
          type={"password"}
          placeholder="Password"
          variant="outlined"
          required={true}
          onChange={(t) => setPassword(t.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleClick}
        >
          Login
        </Button>
        <Link href={"/signup"}>Sign up</Link>
      </Stack>
    </Box>
  );
}
