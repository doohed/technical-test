import axios from "axios";

const API_URL = "https://nestjs-technical-test-production.up.railway.app/api";
const proxyUrl = "https://cors.bridged.cc/";
const xcorsKey = "temp_1230e9794f355da55356695ea15c209e";

export const getContacts = async (TOKEN) => {
  const response = await axios.get(proxyUrl + `${API_URL}/contacts`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "x-cors-api-key": xcorsKey,
    },
  });
  return response.data;
};

export const getContact = async (TOKEN, id) => {
  const response = await axios.get(proxyUrl + `${API_URL}/contacts/${id}`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "x-cors-api-key": xcorsKey,
    },
  });
  return response.data;
};

export const updateContact = async (id, contactData, token) => {
  const response = await axios.patch(
    proxyUrl + `${API_URL}/contacts/${id}`,
    contactData,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-cors-api-key": xcorsKey,
      },
    }
  );
  return response.data;
};

export const createContact = async (data, token) => {
  const response = await axios.post(proxyUrl + `${API_URL}/contacts`, data, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-cors-api-key": xcorsKey,
    },
  });
  return response.data;
};

export const deleteContact = async (TOKEN, id) => {
  const response = await axios.delete(proxyUrl + `${API_URL}/contacts/${id}`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "x-cors-api-key": xcorsKey,
    },
  });
  return response.data;
};
