import {
  Button,
  Typography,
  Box,
  TextField
} from "@mui/material";
import AddressField from './contactForm/AddressField';
import PhoneField from './contactForm/PhoneField';

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
    <div

    >
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
          type="email"
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
        <AddressField
          key={index}
          index={index}
          address={address}
          formErrors={formErrors}
          handleAddressChange={handleAddressChange}
        />
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
        <PhoneField
          key={index}
          index={index}
          phone={phone}
          formErrors={formErrors}
          handlePhoneChange={handlePhoneChange}
        />
      ))}
      <Button onClick={addPhone} variant="outlined" color="primary" className="mr-2">
        Add Phone
      </Button>
      <Button onClick={removeLastPhone} variant="outlined" color="secondary">
        Remove Last Phone
      </Button>
      <br />
      <Button type="submit" variant="contained" color="primary" className="mt-2">
        Save
      </Button>
    </Box>

    </div>  );
};

export default ContactForm;

