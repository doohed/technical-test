import { Box, TextField, Select, MenuItem, Typography } from "@mui/material";

const PhoneField = ({ index, phone, formErrors, handlePhoneChange }) => (
  <Box key={index} sx={{ marginBottom: 2 }}>
    <Typography>Phone {index + 1}</Typography>
    <TextField
      id={`phoneNumber-${index}`}
      label="Phone Number"
      name="phoneNumber"
      variant="filled"
      type="number"
      value={phone.phoneNumber}
      onChange={(e) => handlePhoneChange(index, e)}
      error={!!formErrors[`phone-${index}-phoneNumber`]}
      helperText={formErrors[`phone-${index}-phoneNumber`]}
    />
    <Select
      id={`type-${index}`}
      name="type"
      variant="filled"
      value={phone.type}
      onChange={(e) => handlePhoneChange(index, e)}
      error={!!formErrors[`phone-${index}-type`]}
      helperText={formErrors[`phone-${index}-type`]}
    >
      <MenuItem value="casa">Casa</MenuItem>
      <MenuItem value="móvil">Móvil</MenuItem>
      <MenuItem value="trabajo">Trabajo</MenuItem>
    </Select>
  </Box>
);

export default PhoneField;
