
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContact, updateContact } from '../api/contactsApi.js';
import { Toaster, toast } from 'sonner';
import { CircularProgress, Alert, Typography } from "@mui/material";
import ContactForm from '../components/ContactForm.jsx';

const EditContactPage = () => {
  const params = useParams();
  const [formData, setFormData] = useState({
    addresses: [],
    name: '',
    lastName: '',
    email: '',
    phones: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactResult = await getContact(token, params.id);
        setFormData({
          name: contactResult.name,
          lastName: contactResult.lastName,
          email: contactResult.email,
          addresses: contactResult.addresses,
          phones: contactResult.phones
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to load contact data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContact();
    }
  }, [token, params.id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      addresses: prevState.addresses.map((address, idx) =>
        idx === index ? { ...address, [name]: value } : address
      )
    }));
  };

  const handlePhoneChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      phones: prevState.phones.map((phone, idx) =>
        idx === index ? { ...phone, [name]: value } : phone
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    // Check for empty fields in formData
    for (let key in formData) {
      if (!formData[key] && key !== 'addresses' && key !== 'phones') {
        errors[key] = "This field is required";
      }
    }

    // Check for empty fields in addresses
    formData.addresses.forEach((address, index) => {
      for (let key in address) {
        if (!address[key]) {
          errors[`address-${index}-${key}`] = "This field is required";
        }
      }
    });

    // Check for empty fields in phones
    formData.phones.forEach((phone, index) => {
      for (let key in phone) {
        if (!phone[key]) {
          errors[`phone-${index}-${key}`] = "This field is required";
        }
      }
    });
    setFormErrors(errors);


    if (Object.keys(errors).length === 0) {
      const postData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        addresses: formData.addresses,
        phones: formData.phones
      };
      postData.addresses = postData.addresses.map(address => {
        const { id, ...rest } = address;
        return rest;
      });
      postData.phones = postData.phones.map(phone => {
        const { id, ...rest } = phone;
        return rest;
      });


      try {
        const contactsResult = await updateContact(params.id, JSON.stringify(postData), token);
        toast.success('Data submitted');
      } catch (error) {
        console.error("Error updating contact:", error);
        toast.error('Failed to submit data');
      }
    }
  };

  if (!token) {
    return <Alert severity="warning">Please log in...</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contact Info
      </Typography>
      <ContactForm
        formData={formData}
        formErrors={formErrors}
        handleFormChange={handleFormChange}
        handleAddressChange={handleAddressChange}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
      />
      <Toaster richColors/>
    </div>
  );
};

export default EditContactPage;

