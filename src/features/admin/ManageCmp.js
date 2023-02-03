import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Tab, Tabs, Container,Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditPoll from '../admin/components/EditPoll';
import { URL_PATH } from '../../utils/routes/constants/routeslinks';
import { tabStyle, a11yProps} from './components/ManagePoll';
import { useSelector } from 'react-redux';

const { DASHBOARD, CREATE_POLL, RESULTS, MANAGE_POLL} = URL_PATH;

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


export default function ManageCmp() {
  const pollData = useSelector(state => state.pollSlice.allPolls);
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = useState(0);
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
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
          <ListItemButton component={NavLink} to={`/admin/${DASHBOARD}`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={NavLink} to={`/admin/${RESULTS}`}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Results" />
          </ListItemButton>
          <ListItemButton component={NavLink} to={`/admin/${MANAGE_POLL}/${CREATE_POLL}`}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Polls" />
          </ListItemButton>
          
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
        <Container maxWidth="lg" sx={{ mb: 4, background: '#fff' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabs} aria-label="basic tabs example" centered>
              <Tab sx={tabStyle} label="Edit" {...a11yProps(0)} />
            </Tabs>
          </Box>
          {pollData.length==0?
          <Typography align="center" component="p" variant="p" my={15}>
            Please go back and try again
          </Typography>
          :
          <EditPoll />}
        </Container>
    </Box>
  )
}
