import * as React from 'react';
import '../../assets/styles/PollApp.css';
import { AppBar, Box, Button, IconButton, ListItemIcon, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Drawer from './Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logo from '../../assets/images/hand-click-1299.svg';
import { NavLink } from 'react-router-dom';
import { URL_PATH, MAIN_MENU } from '../../utils/routes/constants/routeslinks';
import { CONSTANTS } from '../../utils/constants/constants';
import UserAccMenu from '../../features/user/components/navmenu/UserAccMenu';
import { useSelector } from 'react-redux';




export const navbarColor = 'linear-gradient(rgb(8, 64, 90),rgb(20, 48, 66))';

export default function NavBar({
  handleDrawerToggle,
  mobileOpen,
  signOut
}) {
  const matches = useMediaQuery('(min-width:765px)');
  const auth = useSelector(state => state.userSlice.auth);

  const { SIGNIN, SIGNUP } = CONSTANTS;

  const menuCls = {
    display: { xs: 'none', sm: 'block' },
    padding: '0.19rem 1rem',
    margin: '0 0.5rem',
    color: '#fff',
    textTransform: 'none'
  }

  const localData = localStorage.getItem('user-info');
  const authUser = JSON.parse(localData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundImage: navbarColor }}>
        <Toolbar>
          {matches == false && <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => handleDrawerToggle(!mobileOpen)}
            sx={{ mr: 2, position: '', zIndex: '20', color: '#26c6da' }}
          >
            <MenuIcon />
          </IconButton>}
          {mobileOpen && matches == false ? <Drawer handleDrawerToggle={handleDrawerToggle} signOut={signOut} /> : ""}
          <Box sx={{ flexGrow: 1 }}>
            <NavLink
              to='/'
              style={{
                fontSize: '1.3rem',
                color: '#fff'
              }}
            >
              <img src={Logo} style={{ verticalAlign: 'middle' }} className='logo' alt='logo' />
              <span>Touchpoll</span>
            </NavLink>


          </Box>
          {matches && MAIN_MENU.map((route, index) => {
            return (
              <Button
                key={index}
                variant='outlined'
                component={NavLink}
                to={route.link}
                sx={menuCls}
              >
                {route.title}
              </Button>
            )
          })
          }

          {!matches&&auth.token?<Box>
            <Typography component="small" variant="small" color="success" ml={1}>Logined as {auth.name}</Typography>
          </Box>:""}
          
          {matches && localData == undefined || null ?
            <>
              <Button
                variant='contained'
                color='primary'
                component={NavLink}
                to={URL_PATH.SIGNIN}
                sx={menuCls}

              >
                {SIGNIN.SIGNIN}
              </Button>
              <Button
                variant='contained'
                color='success'
                component={NavLink}
                to={URL_PATH.SIGNUP}
                sx={menuCls}
              >
                {SIGNUP.REGISTER}
              </Button>
            </>
            :
            matches && <UserAccMenu style={menuCls} username={authUser.name} signOut={signOut} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}