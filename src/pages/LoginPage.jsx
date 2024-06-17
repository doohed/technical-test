import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, clearToken } from '../redux/tokenSlice.js';

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
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Login successful:', response.data);
      console.log(response.data.access_token);
      dispatch(setToken(response.data.access_token));
      console.log(useSelector(state => state.token));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
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
  );
};

export default Login;
