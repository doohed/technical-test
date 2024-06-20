import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
//Decidi unsar un datagrid de MaterialUI por su simplesa y facilidad
const columns = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "lastName", headerName: "Apellidos", width: 200 },
  { field: "email", headerName: "Correo", width: 200 },
  { field: "phone", headerName: "Numero", width: 150 },
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "actions",
    headerName: "",
    width: 100,
    renderCell: (params) => (
      <Stack className="m-[6px]" direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => params.row.handleEdit(params.row.id)}
        >
          Editar
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
