import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 300 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <Stack className="m-[6px]" direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => params.row.handleEdit(params.row.id)}
        >
          Edit
        </Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </Stack>
    ),
  },
];

const ContactDetails = ({ contacts }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/contact/edit/${id}`);
  };

  const rows = contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    lastName: contact.lastName,
    email: contact.email,
    handleEdit: handleEdit, // Pass handleEdit function to each row
  }));

  return (
    <div style={{ height: '70vh', width: '70vw' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default ContactDetails;

