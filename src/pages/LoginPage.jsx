import React, { useState } from "react";
import axios from "axios";
import {
  styled,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const proxyUrl = "https://cors.bridged.cc/";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (userName === "" || password === "") {
      console.log("no");
      return;
    }
    try {
      const response = await axios.post(
        proxyUrl +
          "https://nestjs-technical-test-production.up.railway.app/api/auth/login",
        {
          userName: userName,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "x-cors-api-key": "temp_1230e9794f355da55356695ea15c209e",
          },
        }
      );
      console.log(response.data.access_token);
      window.localStorage.setItem("token", response.data.access_token);
      window.localStorage.setItem("isLoggedIn", true);
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '30ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        </Box>
      <Button  variant="outlined" size="medium" onClick={handleLogin}>
          Login
      </Button>

    </>
  );
};

export default Login;
