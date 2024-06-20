import { useState } from "react";
import { createContact } from "../api/contactsApi.js";
import { Toaster, toast } from "sonner";
import { Typography, Alert } from "@mui/material";
import ContactForm from "../components/contact/contactForm/ContactForm.jsx";
import { useNavigate } from "react-router-dom";

const CreateContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    addresses: [
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
    name: "",
    lastName: "",
    email: "",
    phones: [
      {
        phoneNumber: "",
        type: "",
      },
    ],
  });
  const [formErrors, setFormErrors] = useState({});
  const token = window.localStorage.getItem("token");

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

    // Revisar espacios vacios en addresses
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
    // Se prepara y se da el schema para el post
    if (Object.keys(errors).length === 0) {
      const postData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        addresses: formData.addresses,
        phones: formData.phones,
      };

      try {
        const contactsResult = await createContact(
          JSON.stringify(postData),
          token
        );
        toast.success("Contacto creado exitosamente");
        navigate("/");
      } catch (error) {
        console.error("Error creando contact:", error);
        toast.error("No se pudo crear contacto");
      }
    }
  };

  if (!token) {
    return <Alert severity="warning">Porfavor inicie sesión...</Alert>;
  }

  return (
    <div className="mt-[10vh] mb-[10vh]">
      <Typography variant="h4" gutterBottom>
        Crear Contacto
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
      <Toaster richColors />
    </div>
  );
};

export default CreateContactPage;
