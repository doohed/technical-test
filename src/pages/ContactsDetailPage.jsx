import React, { useEffect, useState } from "react";
import { CircularProgress, useMediaQuery, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ContactDetailsDataGrid from "../components/contact/ContactDetailsDataGrid.jsx";
import ContactDetailsList from "../components/contact/ContactDetailsList.jsx";
import { getContacts } from "../api/contactsApi.js";
import AddContact from "../components/contact/AddContact.jsx";
import { useNavigate } from "react-router-dom";

const ContactsDetailPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const token = window.localStorage.getItem("token");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsResult = await getContacts(token);
        setContacts(contactsResult);
      } catch (error) {
        console.error("Error al recuperar contactos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContacts();
    }
  }, [token]);

  const handleEdit = (id) => {
    navigate(`/contact/edit/${id}`);
  };

  if (!token) {
    return <div>Porfavor inicie sesión...</div>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mt-[7vh] ">
        <TextField
          label="Buscar"
          variant="standard"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px" }}
        />
      </div>
      {isLargeScreen ? (
        <ContactDetailsDataGrid
          contacts={filteredContacts}
          handleEdit={handleEdit}
        />
      ) : (
        <ContactDetailsList
          contacts={filteredContacts}
          handleEdit={handleEdit}
        />
      )}
      <AddContact />
    </div>
  );
};

export default ContactsDetailPage;
