import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getContact,
  updateContact,
  deleteContact,
} from "../api/contactsApi.js";
import { Toaster, toast } from "sonner";
import {
  Typography,
  Alert,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ContactForm from "../components/contact/contactForm/ContactForm.jsx";
import { useNavigate } from "react-router-dom";

const EditContactPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    addresses: [],
    name: "",
    lastName: "",
    email: "",
    phones: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    //para renderizar los contactos en la 1er carga de la pagina
    const fetchContact = async () => {
      try {
        const contactResult = await getContact(token, params.id);
        setFormData({
          name: contactResult.name,
          lastName: contactResult.lastName,
          email: contactResult.email,
          addresses: contactResult.addresses,
          phones: contactResult.phones,
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to load contact data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContact();
    }
  }, [token, params.id]);

  //Cambiar datos en especifico del Object
  //Sin afectar los demas

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      addresses: prevState.addresses.map((address, idx) =>
        idx === index ? { ...address, [name]: value } : address
      ),
    }));
  };

  const handlePhoneChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      phones: prevState.phones.map((phone, idx) =>
        idx === index ? { ...phone, [name]: value } : phone
      ),
    }));
  };

  const addAddress = () => {
    setFormData((prevState) => ({
      ...prevState,
      addresses: [
        ...prevState.addresses,
        {
          street: "",
          number: "",
          suburb: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          type: "",
        },
      ],
    }));
  };

  const removeLastAddress = () => {
    setFormData((prevState) => ({
      ...prevState,
      addresses: prevState.addresses.slice(0, -1),
    }));
  };

  const addPhone = () => {
    setFormData((prevState) => ({
      ...prevState,
      phones: [
        ...prevState.phones,
        {
          phoneNumber: "",
          type: "",
        },
      ],
    }));
  };

  const removeLastPhone = () => {
    setFormData((prevState) => ({
      ...prevState,
      phones: prevState.phones.slice(0, -1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    // Revisar espacios vacios en formData
    for (let key in formData) {
      if (!formData[key] && key !== "addresses" && key !== "phones") {
        errors[key] = "Espacio requerido";
      }
    }

    // Revisar espacios vacios en adresses 
    formData.addresses.forEach((address, index) => {
      for (let key in address) {
        if (!address[key]) {
          errors[`address-${index}-${key}`] = "Espacio requerido";
        }
      }
    });

    // Revisar espacios vacios en phones
    formData.phones.forEach((phone, index) => {
      for (let key in phone) {
        if (!phone[key]) {
          errors[`phone-${index}-${key}`] = "Espacio requerido";
        }
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Se prepara y se da el schema para el patch
      const postData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        addresses: formData.addresses,
        phones: formData.phones,
      };
      postData.addresses = postData.addresses.map((address) => {
        const { id, ...rest } = address;
        return rest;
      });
      postData.phones = postData.phones.map((phone) => {
        const { id, ...rest } = phone;
        return rest;
      });

      try {
        const contactsResult = await updateContact(
          params.id,
          JSON.stringify(postData),
          token
        );
        toast.success("Contacto actualizado");
      } catch (error) {
        console.error("Error actualizando contacto:", error);
        toast.error("No se pudo actualizar contacto");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContact(token, params.id);
      toast.success("Contacto borrado");
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };

  const openDeleteDialog = () => {
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    closeDeleteDialog();
    await handleDelete();
  };

  if (!token) {
    return <Alert severity="warning">Favor de iniciar sesion...</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div className="mt-[10vh] mb-[10vh]">
      <Typography variant="h4" gutterBottom>
        Editar Contacto
      </Typography>
      <ContactForm
        formData={formData}
        formErrors={formErrors}
        handleFormChange={handleFormChange}
        handleAddressChange={handleAddressChange}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
        addAddress={addAddress}
        removeLastAddress={removeLastAddress}
        addPhone={addPhone}
        removeLastPhone={removeLastPhone}
      />
      <Button
        onClick={openDeleteDialog}
        style={{ width: 160, margin: 10 }}
        variant="contained"
        color="error"
        className="mt-2"
      >
        Borrar contacto
      </Button>

      <Dialog
        open={openDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Seguro de borrar este contacto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>

      <Toaster richColors />
    </div>
  );
};

export default EditContactPage;
