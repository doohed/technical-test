import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Button, TextField, Alert, Typography } from "@mui/material";
import { signIn } from "../api/contactsApi.js";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Iniciar sesión");

  const handleLogin = async () => {
    // Reseteo de errores
    setUserNameError(false);
    setPasswordError(false);
    setErrorMessage("");

    if (userName === "" || password === "") {
      if (userName === "") setUserNameError(true);
      if (password === "") setPasswordError(true);
      setErrorMessage("Los dos espacios son requeridos.");
      return;
    }

    const data = {
      userName: userName,
      password: password,
    };

    setIsSigningIn(true);
    setButtonLabel("Iniciando sesión");

    try {
      const token = await signIn(JSON.stringify(data));
      //se guarda localmente al variabel de inicio de sesion
      //y el token para mantener la sesion una vez el navegador fue cerrado
      window.localStorage.setItem("token", token.access_token);
      window.localStorage.setItem("isLoggedIn", true);
      window.location.reload();
    } catch (error) {
      setErrorMessage("Usuario o Contraseña incorrectos.");
      setIsSigningIn(false);
      setButtonLabel("Iniciar sesión");
    }
  };

  return (
    <div className="border rounded p-8  border-[#81c784]">
      <Typography className="text-[#388e3c]" variant="h4" gutterBottom>
        PKT1 Contactos
      </Typography>
      <Box
        className="mt-[30px]"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Usuario"
          variant="standard"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (userNameError) setUserNameError(false);
          }}
          error={userNameError}
          helperText={userNameError ? "Usuario requerido." : ""}
        />
        <br />
        <TextField
          id="password"
          label="Contraseña"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError(false);
          }}
          error={passwordError}
          helperText={passwordError ? "Contraseña requerida." : ""}
        />
        <br />
        <br />
      </Box>
      <Button
        variant="outlined"
        size="medium"
        onClick={handleLogin}
        disabled={isSigningIn}
      >
        <p className="mt-[3px]">{buttonLabel}</p>
        <LoginIcon className="ml-2" />
      </Button>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default Login;
