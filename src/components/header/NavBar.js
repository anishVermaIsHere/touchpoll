import React from "react";
import "../../assets/styles/PollApp.css";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Drawer from "./Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../assets/images/hand-click-1299.svg";
import { NavLink } from "react-router-dom";
import { URL_PATH, MAIN_MENU } from "../../config/constants/routeslinks";
import { CONSTANTS } from "../../utils/constants/constants";
import UserAccMenu from "../../features/user/components/navmenu/UserAccMenu";
import { useSelector } from "react-redux";
import { getAuthStorage } from "../../utils";

export const navbarColor = "linear-gradient(rgb(8, 64, 90),rgb(20, 48, 66))";

export default function NavBar({ handleDrawerToggle, mobileOpen, signOut }) {
  const matches = useMediaQuery("(min-width:765px)");
  const auth = getAuthStorage();

  const { SIGNIN, SIGNUP } = CONSTANTS;

  const menuCls = {
    display: { xs: "none", sm: "block" },
    padding: "0.19rem 1rem",
    margin: "0 0.5rem",
    color: "#fff",
    textTransform: "none",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundImage: navbarColor }}>
        <Toolbar>
          {matches == false && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => handleDrawerToggle(!mobileOpen)}
              sx={{ mr: 2, position: "", zIndex: "20", color: "#26c6da" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {mobileOpen && matches == false ? (
            <Drawer handleDrawerToggle={handleDrawerToggle} signOut={signOut} />
          ) : (
            ""
          )}
          <Box sx={{ flexGrow: 1 }}>
            <NavLink
              to="/"
              style={{
                fontSize: "1.3rem",
                color: "#fff",
              }}
            >
              <img
                src={Logo}
                style={{ verticalAlign: "middle" }}
                className="logo"
                alt="logo"
              />
              <span>Touchpoll</span>
            </NavLink>
          </Box>
          {matches && auth?.token && (
            MAIN_MENU.map((route, index) => {
              return (
                <Button
                  key={index}
                  variant="outlined"
                  component={NavLink}
                  to={route.link}
                  sx={menuCls}
                >
                  {route.title}
                </Button>
              );
            })
          )}

          <Button
            variant="outlined"
            color="primary"
            component={NavLink}
            to={URL_PATH.ABOUT}
            sx={menuCls}
          >
            About us
          </Button>

          {!matches && auth?.token ? (
            <Box>
              <Typography
                component="medium"
                variant="medium"
                sx={{
                  background: "green",
                  padding: "0.1rem 0.5rem",
                  borderRadius: "0.2rem",
                }}
                ml={1}
              >
                {auth?.name}
              </Typography>
            </Box>
          ) : (
            ""
          )}

          {(matches && !auth?.token) || null ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                component={NavLink}
                to={URL_PATH.SIGNIN}
                sx={menuCls}
              >
                {SIGNIN.SIGNIN}
              </Button>
              <Button
                variant="contained"
                color="success"
                component={NavLink}
                to={URL_PATH.SIGNUP}
                sx={menuCls}
              >
                {SIGNUP.REGISTER}
              </Button>
            </>
          ) : (
            matches && (
              <UserAccMenu
                style={menuCls}
                username={auth?.name}
                signOut={signOut}
              />
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
