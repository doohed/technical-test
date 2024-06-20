import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "lastName", headerName: "Last Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Number", width: 150 },
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => (
      <Stack className="m-[6px]" direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => params.row.handleEdit(params.row.id)}
        >
          Edit
        </Button>
      </Stack>
    ),
  },
];

const ContactDetailsDataGrid = ({ contacts, handleEdit }) => {
  const rows = contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phones[0].phoneNumber,
    handleEdit,
  }));

  return (
    <div style={{ height: "75vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default ContactDetailsDataGrid;
