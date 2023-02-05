import React from 'react';
import { styled} from '@mui/material/styles';
import { Outlet,NavLink } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { ListItemButton, ListItemIcon, ListItemText,useMediaQuery } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { mainListItems } from './listItems';
import { useSelector } from 'react-redux';
import { ACCOUNT,PROFILE} from '../../../utils/routes/AppRoutes';
import { activeStyle } from './listItems';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      zIndex: '10',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'auto',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


export default function Dashboard() {
  const matches = useMediaQuery('(min-width:765px)');
  const auth=useSelector(state=>state.userSlice.auth);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {matches && <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />

        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          <ListItemButton style={({isActive})=>isActive?activeStyle:undefined} component={NavLink} to={`${ACCOUNT}/${auth.name}/${PROFILE}`} >
            <ListItemIcon  sx={{color:'inherit'}}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>
      </Drawer>
      }
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: 'auto'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
