import React, { useEffect, useState } from "react";
import ContactDetails from "../components/ContactDetails.jsx"
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../api/contactsApi.js";
import {CircularProgress} from "@mui/material";
import SignOut from '../components/SignOut.jsx';
const ContactsDetailPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsResult = await getContacts();
        setContacts(contactsResult);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContacts();
    }
  }, [token]);

  if (!token) {
    return <div>Please log in...</div>;
  }

  if (loading) {
    return <CircularProgress/>;
  }
  console.log(contacts)

  return (
    <div>
      <SignOut/>
      <h1>Contact Info</h1>
      <ContactDetails contacts={contacts}/>
    </div>
  );
};

export default ContactsDetailPage;
