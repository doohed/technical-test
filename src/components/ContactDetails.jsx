import React from 'react'
import { Grid, Paper, styled, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ContactDetails = ({contacts}) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/contact/edit/${id}`);
  }

  return (
    <div>
      <Grid container spacing={1}>
        {contacts.map((contact) => (
          <Grid item xs={12} key={contact.id}>
            <Item>
              <Box display="flex">
                <Box className="text-left w-[30%] mt-[8px]">
                  {contact.name} {contact.lastName}
                </Box>
                <Box className="text-left w-[50%] mt-[8px]">{contact.email}</Box>
                <Stack className="w-[10%]" direction="row" spacing={2}>
                  <Button className="mr-5" variant="contained" color="primary" onClick={() => {handleEdit(contact.id)}}>Edit</Button>
                  <Button variant="contained" color="error">Delete</Button>
                </Stack>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ContactDetails
