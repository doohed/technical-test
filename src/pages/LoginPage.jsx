import React, { useState } from 'react';
import axios from 'axios';

const proxyUrl = 'https://cors.bridged.cc/';


const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        proxyUrl + 'https://nestjs-technical-test-production.up.railway.app/api/auth/login',
        {
          userName: userName,
          password: password
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'x-cors-api-key': "temp_1230e9794f355da55356695ea15c209e",
          }
        }
      );
      console.log(response.data.access_token);
      window.localStorage.setItem("token", response.data.access_token);
      window.localStorage.setItem("isLoggedIn",true);
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <>
      <div>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;