
import React, { useState } from "react";
import { createContact } from '../api/contactsApi.js';
import { Toaster, toast } from 'sonner';
import { Typography, Alert } from "@mui/material";
import ContactForm from '../components/ContactForm';

const CreateContactPage = () => {
  const [formData, setFormData] = useState({
    addresses: [{
      street: '',
      number: '',
      suburb: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      type: ''
    }],
    name: '',
    lastName: '',
    email: '',
    phones: [{
      phoneNumber: '',
      type: ''
    }]
  });
  const [formErrors, setFormErrors] = useState({});
  const token = window.localStorage.getItem("token");

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

    for (let key in formData) {
      if (!formData[key] && key !== 'addresses' && key !== 'phones') {
        errors[key] = "This field is required";
      }
    }

    formData.addresses.forEach((address, index) => {
      for (let key in address) {
        if (!address[key]) {
          errors[`address-${index}-${key}`] = "This field is required";
        }
      }
    });

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

      try {
        await createContact(JSON.stringify(postData), token);
        toast.success('Contact created successfully');
        setFormData({
          addresses: [{
            street: '',
            number: '',
            suburb: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            type: ''
          }],
          name: '',
          lastName: '',
          email: '',
          phones: [{
            phoneNumber: '',
            type: ''
          }]
        });
        setFormErrors({});
      } catch (error) {
        console.error("Error creating contact:", error);
        toast.error('Failed to create contact');
      }
    }
  };

  if (!token) {
    return <Alert severity="warning">Please log in...</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create Contact
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

export default CreateContactPage;
