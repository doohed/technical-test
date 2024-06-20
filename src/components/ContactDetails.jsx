import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "lastName", headerName: "Last Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
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
        <Button
          variant="contained"
          color="error"
          onClick={() => params.row.handleDelete(params.row.id)}
        >
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

  const handleDelete = (id) => {
    const token = window.localStorage.getItem("token");
  };

  const rows = contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    lastName: contact.lastName,
    email: contact.email,
    handleEdit: handleEdit, // Pass handleEdit function to each row
    handleDelete: handleDelete,
  }));

  return (
    <div>
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
