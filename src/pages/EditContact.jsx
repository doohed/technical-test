import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContact } from '../api/contactsApi.js';
import {
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

const EditContact = () => {
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
        const contactResult = await getContact(params.id);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    // Check for empty fields in formData
    for (let key in formData) {
      if (!formData[key]) {
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

      console.log("Form submitted successfully", postData);
      // Add your form submission logic here, e.g., calling an API to save data
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
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="filled"
            value={formData.name}
            onChange={handleFormChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            variant="filled"
            value={formData.lastName}
            onChange={handleFormChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="filled"
            value={formData.email}
            onChange={handleFormChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </div>
        <Typography variant="h6" gutterBottom>
          Addresses
        </Typography>
        {formData.addresses.map((address, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              id={`street-${index}`}
              label="Street"
              name="street"
              variant="filled"
              value={address.street}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-street`]}
              helperText={formErrors[`address-${index}-street`]}
            />
            <TextField
              id={`number-${index}`}
              label="Number"
              name="number"
              variant="filled"
              value={address.number}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-number`]}
              helperText={formErrors[`address-${index}-number`]}
            />
            <TextField
              id={`suburb-${index}`}
              label="Suburb"
              name="suburb"
              variant="filled"
              value={address.suburb}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-suburb`]}
              helperText={formErrors[`address-${index}-suburb`]}
            />
            <TextField
              id={`city-${index}`}
              label="City"
              name="city"
              variant="filled"
              value={address.city}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-city`]}
              helperText={formErrors[`address-${index}-city`]}
            />
            <TextField
              id={`state-${index}`}
              label="State"
              name="state"
              variant="filled"
              value={address.state}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-state`]}
              helperText={formErrors[`address-${index}-state`]}
            />
            <TextField
              id={`postalCode-${index}`}
              label="Postal Code"
              name="postalCode"
              variant="filled"
              value={address.postalCode}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-postalCode`]}
              helperText={formErrors[`address-${index}-postalCode`]}
            />
            <TextField
              id={`country-${index}`}
              label="Country"
              name="country"
              variant="filled"
              value={address.country}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-country`]}
              helperText={formErrors[`address-${index}-country`]}
            />
            <TextField
              id={`type-${index}`}
              label="Type"
              name="type"
              variant="filled"
              value={address.type}
              onChange={(e) => handleAddressChange(index, e)}
              error={!!formErrors[`address-${index}-type`]}
              helperText={formErrors[`address-${index}-type`]}
            />
          </Box>
        ))}
        <Typography variant="h6" gutterBottom>
          Phones
        </Typography>
        {formData.phones.map((phone, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              id={`phoneNumber-${index}`}
              label="Phone Number"
              name="phoneNumber"
              variant="filled"
              value={phone.phoneNumber}
              onChange={(e) => handlePhoneChange(index, e)}
              error={!!formErrors[`phone-${index}-phoneNumber`]}
              helperText={formErrors[`phone-${index}-phoneNumber`]}
            />
            <TextField
              id={`type-${index}`}
              label="Type"
              name="type"
              variant="filled"
              value={phone.type}
              onChange={(e) => handlePhoneChange(index, e)}
              error={!!formErrors[`phone-${index}-type`]}
              helperText={formErrors[`phone-${index}-type`]}
            />
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default EditContact;
