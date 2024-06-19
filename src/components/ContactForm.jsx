
import React from 'react';
import {
  Button,
  Typography,
  Box,
  TextField
} from "@mui/material";

const ContactForm = ({
  formData,
  formErrors,
  handleFormChange,
  handleAddressChange,
  handlePhoneChange,
  handleSubmit,
  addAddress,
  removeLastAddress,
  addPhone,
  removeLastPhone
}) => {
  return (
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
      <Button onClick={addAddress} variant="outlined" color="primary">
        Add Address
      </Button>
      <Button onClick={removeLastAddress} variant="outlined" color="secondary">
        Remove Last Address
      </Button>
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
      <Button onClick={addPhone} variant="outlined" color="primary" className="mr-2">
        Add Phone
      </Button>
      <Button onClick={removeLastPhone} variant="outlined" color="secondary">
        Remove Last Phone
      </Button>
      <br/>
      <Button type="submit" variant="contained" color="primary" className="mt-2">
        Save
      </Button>
    </Box>
  );
};

export default ContactForm;

