import axios from 'axios';


const API_URL='https://nestjs-technical-test-production.up.railway.app/api';
const proxyUrl = 'https://cors.bridged.cc/';
const xcorsKey = 'temp_1230e9794f355da55356695ea15c209e'

export const getContacts = async () => {
  const TOKEN=window.localStorage.getItem("token");
  if (TOKEN === ''){
    return;
  }
  const response = await axios.get(proxyUrl + `${API_URL}/contacts`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
      'x-cors-api-key': xcorsKey,
    }
  });
  return response.data;
};

export const getContact = async (id) => {
  const TOKEN=window.localStorage.getItem("token");
  if (TOKEN === ''){
    return;
  }
  const response = await axios.get(proxyUrl + `${API_URL}/contacts/${id}`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
      'x-cors-api-key': xcorsKey,
    }
  });
  return response.data;
};

export const updateContact = async (contact) => {
  const TOKEN=window.localStorage.getItem("token");
  if (TOKEN === ''){
    return;
  }
  const response = await axios.patch(proxyUrl + `${API_URL}/contacts/${id}`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
      'x-cors-api-key': xcorsKey,
    }
  });
  return response.data;
};
