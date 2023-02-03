import React from 'react';
import { useMediaQuery, Container, Divider, Paper, Box, MenuItem, MenuList, Typography, ListItemIcon } from '@mui/material';
import { SIDEBAR_MENU, URL_PATH } from '../../utils/routes/constants/routeslinks';
import { NavLink } from 'react-router-dom';
import { CONSTANTS } from '../../utils/constants/constants';
import { useSelector } from 'react-redux';
import { activeStyle } from '../../features/admin/components/listItems';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Drawer = (props) => {
  const matches = useMediaQuery('(min-width:764px)');
  const auth = useSelector(state => state.userSlice.auth);
  const { SIGNIN, SIGNUP, USER_MENU } = CONSTANTS;
  const drawer = {
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: -25,
    width: 300,
    background: 'primary',
  }

  return <>
    <Container sx={drawer}>
      <Paper elevation={4} sx={{ height: '100%', borderRadius: '0' }}>
        <MenuList sx={{ paddingTop: 8 }}>
          {auth.token == null || undefined ?
            <>
              <MenuItem
                sx={{ paddingLeft: 5 }}
                component={NavLink}
                style={({ isActive }) => isActive ? activeStyle : undefined}
                to={URL_PATH.SIGNIN}
                onClick={() => props.handleDrawerToggle(false)}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <LoginIcon />
                </ListItemIcon>
                {SIGNIN.SIGNIN}
              </MenuItem>
              <MenuItem
                sx={{ paddingLeft: 5 }}
                component={NavLink}
                style={({ isActive }) => isActive ? activeStyle : undefined}
                to={URL_PATH.SIGNUP}
                onClick={() => props.handleDrawerToggle(false)}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                {SIGNUP.REGISTER}
              </MenuItem>
              <Divider sx={{ my: 1 }} />
            </>
            :
            <>

              <MenuItem
                sx={{ paddingLeft: 5 }}
                component={NavLink}
                style={({ isActive }) => isActive ? activeStyle : undefined}
                to={`/admin/${URL_PATH.ACCOUNT}/${auth.name}/${URL_PATH.PROFILE}`}
                onClick={() => props.handleDrawerToggle(false)}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <AccountBoxIcon />
                </ListItemIcon>
                {USER_MENU.ACCOUNT}
              </MenuItem>
              <MenuItem
                sx={{ paddingLeft: 5 }}
                onClick={() => {
                  props.handleDrawerToggle(false);
                  props.signOut();
                }}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <LogoutIcon />
                </ListItemIcon>
                {USER_MENU.SIGNOUT}
              </MenuItem>
              <Divider sx={{ my: 1 }} />
            </>
          }
          {SIDEBAR_MENU.map((route, index) => {
            return route.type == 1 ? <>
              <MenuItem
                key={index}
                style={({ isActive }) => isActive ? activeStyle : undefined}
                component={NavLink}
                to={route.link}
                onClick={() => props.handleDrawerToggle(false)}
                sx={{ paddingLeft: 5 }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {<route.icon />}
                </ListItemIcon>
                {route.title}
              </MenuItem>
            </>
              : ""
          })
          }

          {SIDEBAR_MENU.map((route, index) => {
            return auth.token !== null && route.type == 2 ?
              <>
                <MenuItem
                  key={index}
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  component={NavLink}
                  to={route.link}
                  onClick={() => props.handleDrawerToggle(false)}
                  sx={{ paddingLeft: 5 }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {<route.icon />}
                  </ListItemIcon>
                  {route.title}
                </MenuItem>
              </>
              : ""
          })
          }

        </MenuList>
      </Paper>

    </Container>
  </>

}

export default Drawer