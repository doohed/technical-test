import { Button, Typography, Box, TextField } from "@mui/material";
import AddressField from "./AddressField";
import PhoneField from "./PhoneField";

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
  removeLastPhone,
}) => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="name"
            label="Nombre"
            name="name"
            variant="filled"
            value={formData.name}
            onChange={handleFormChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            id="lastName"
            label="Apellidos"
            name="lastName"
            variant="filled"
            value={formData.lastName}
            onChange={handleFormChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
          <TextField
            id="email"
            label="Correo"
            type="email"
            name="email"
            variant="filled"
            value={formData.email}
            onChange={handleFormChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </div>
        <div className="border-t-2 border-gray-200 mt-8 pt-8">
          <Typography variant="h6" gutterBottom>
            Direcciónes
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
          <Button
            style={{ width: 90, margin: 5 }}
            onClick={addAddress}
            variant="contained"
            color="primary"
          >
            Agregar
          </Button>
          <Button
            style={{ width: 90, margin: 5 }}
            onClick={removeLastAddress}
            variant="contained"
            color="error"
          >
            Remover
          </Button>
        </div>
        <div className="border-t-2 border-b-2 border-gray-200 mt-8 pt-8 mb-8 pb-8">
          <Typography variant="h6" gutterBottom>
            Números de Telefono
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
          <Button
            style={{ width: 90, margin: 5 }}
            onClick={addPhone}
            variant="contained"
            color="primary"
            className="mr-2"
          >
            Agregar
          </Button>
          <Button
            style={{ width: 90, margin: 5 }}
            onClick={removeLastPhone}
            variant="contained"
            color="error"
          >
            Remover
          </Button>
          <br />
        </div>
        <Button
          style={{ width: 160, margin: 10 }}
          type="submit"
          variant="contained"
          color="primary"
          className="mt-2"
        >
          Guardar
        </Button>
      </Box>
    </div>
  );
};

export default ContactForm;
