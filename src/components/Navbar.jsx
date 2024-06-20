import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");
    window.location.reload();
    handleClose();
  };

  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="fixed right-[0px] w-[100vw] top-[0px] z-10">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className="cursor-pointer"
              onClick={handleHome}
              variant="h6"
              color="inherit"
              component="div"
            >
              <HomeIcon className="mb-[5px] mr-2" />
              PKT1 Contacts
            </Typography>
          </Toolbar>
        </AppBar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogOut}>
            Logout
            <LogoutIcon className="ml-2"/>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};
export default Navbar;
