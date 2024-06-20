import React from 'react';
import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Avatar,
  Button,
  Stack
} from '@mui/material';

const ContactDetailsList = ({ contacts, handleEdit }) => {
 

  return (
  <div className="overflow-y-auto h-[73vh] ">
      <List
      sx={{ mb: 2, width: '90vw'}}>
      {contacts.map((contact, index) => {
        return (
          <React.Fragment key={contact.id}>
            <ListItemButton onClick={()=>{handleEdit(contact.id)}}>
              <ListItemText primary={contact.name} secondary={contact.email} />
            </ListItemButton>
          </React.Fragment>
        );
      })}
    </List>
    </div>
      );
};

export default ContactDetailsList;

