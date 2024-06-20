import { Box, TextField, Select, MenuItem, Typography } from "@mui/material";

const AddressField = ({ index, address, formErrors, handleAddressChange }) => (
  <Box key={index} sx={{ marginBottom: 2 }}>
    <Typography>Address {index + 1}</Typography>
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
      type="number"
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
      type="number"
      variant="filled"
      value={address.postalCode}
      onChange={(e) => handleAddressChange(index, e)}
      error={!!formErrors[`address-${index}-postalCode`]}
      helperText={formErrors[`address-${index}-postalCode`]}
    />
    <div className="mr-[10px]">
      <TextField
        style={{ width: 195 }}
        className="mr-[20px]"
        id={`country-${index}`}
        label="Country"
        name="country"
        variant="filled"
        value={address.country}
        onChange={(e) => handleAddressChange(index, e)}
        error={!!formErrors[`address-${index}-country`]}
        helperText={formErrors[`address-${index}-country`]}
      />
      <Select
        style={{ width: 100 }}
        className="mt-[8px]"
        id={`type-${index}`}
        name="type"
        variant="filled"
        value={address.type}
        onChange={(e) => handleAddressChange(index, e)}
        error={!!formErrors[`address-${index}-type`]}
        helperText={formErrors[`address-${index}-type`]}
      >
        <MenuItem value="casa">Casa</MenuItem>
        <MenuItem value="oficina">Oficina</MenuItem>
        <MenuItem value="trabajo">Trabajo</MenuItem>
      </Select>
    </div>
  </Box>
);

export default AddressField;
