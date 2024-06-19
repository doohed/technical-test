import React from 'react'
import {Button} from "@mui/material";

const SignOut = () => {
  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");
    window.location.reload();
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleSignOut}>
        Log Out
      </Button>
    </div>
  )
}

export default SignOut
