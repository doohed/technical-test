
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContact, updateContact } from '../api/contactsApi.js';
import { Toaster, toast } from 'sonner';
import { Typography, Alert, CircularProgress } from "@mui/material";
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar.jsx';

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

  const addAddress = () => {
    setFormData(prevState => ({
      ...prevState,
      addresses: [...prevState.addresses, {
        street: '',
        number: '',
        suburb: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        type: ''
      }]
    }));
  };

  const removeLastAddress = () => {
    setFormData(prevState => ({
      ...prevState,
      addresses: prevState.addresses.slice(0, -1)
    }));
  };

  const addPhone = () => {
    setFormData(prevState => ({
      ...prevState,
      phones: [...prevState.phones, {
        phoneNumber: '',
        type: ''
      }]
    }));
  };

  const removeLastPhone = () => {
    setFormData(prevState => ({
      ...prevState,
      phones: prevState.phones.slice(0, -1)
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
      <Navbar/>
      <Typography variant="h4" gutterBottom>
        Edit Contact
      </Typography>
      <ContactForm
        formData={formData}
        formErrors={formErrors}
        handleFormChange={handleFormChange}
        handleAddressChange={handleAddressChange}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
        addAddress={addAddress}
        removeLastAddress={removeLastAddress}
        addPhone={addPhone}
        removeLastPhone={removeLastPhone}
      />
      <Toaster richColors />
    </div>
  );
};

export default EditContactPage;

