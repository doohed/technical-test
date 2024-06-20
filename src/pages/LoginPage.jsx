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
    <div
      className="absolute truncate left-[0px] top-[0px] w-[100vw] h-[100vh] bg-[gray]
      text-center
      bg-[url('https://images.unsplash.com/photo-1695781399395-745bf8b7fbea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
      "
    >
      <div
        className=" absolute border rounded-lg pt-8 pb-8 w-[370px]  border-[#81c784]
        left-[50vw] top-[50vh] translate-x-[-50%] translate-y-[-50%]
        backdrop-blur-lg
        bg-[#ffffff10]
        "
      >
        <Typography variant="h4" gutterBottom>
          PKT1 Contactos
        </Typography>
        <Box
          className="mt-[50px] mb-[50px]"
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
    </div>
  );
};

export default Login;
