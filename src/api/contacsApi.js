import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const API_URL='https://nestjs-technical-test-production.up.railway.app/api';
const proxyUrl = 'https://cors.bridged.cc/';

export const getContacts = async () => {
  const TOKEN=window.localStorage.getItem("token");
  if (TOKEN === ''){
    return;
  }
  const response = await axios.get(proxyUrl + `${API_URL}/contacts`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    }
  });
  return response.data;
};
