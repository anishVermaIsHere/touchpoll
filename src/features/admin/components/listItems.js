import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink } from 'react-router-dom';
import { URL_PATH } from '../../../utils/routes/constants/routeslinks';

const {DASHBOARD, CREATE_POLL, MANAGE_POLL, RESULTS}=URL_PATH;

export const activeStyle = {
  // backgroundColor: "rgba(0, 0, 0, 10%)",
  backgroundColor:"rgb(70 110 135)",
  color:"#fff",
};

export const mainListItems = (
  <React.Fragment>
    <ListItemButton style={({isActive})=>isActive?activeStyle:undefined} component={NavLink} to={DASHBOARD}>
      <ListItemIcon sx={{color:'inherit'}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton style={({isActive})=>isActive?activeStyle:undefined} component={NavLink} to={RESULTS}>
      <ListItemIcon sx={{color:'inherit'}}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Results" />
    </ListItemButton>
    <ListItemButton style={({isActive})=>isActive?activeStyle:undefined} component={NavLink} to={`${MANAGE_POLL}/${CREATE_POLL}`}>
      <ListItemIcon sx={{color:'inherit'}}>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Polls" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);