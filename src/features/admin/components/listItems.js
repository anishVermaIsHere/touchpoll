import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import { NavLink } from "react-router-dom";
import { URL_PATH } from "../../../config/constants/routeslinks";

const { DASHBOARD, CREATE_POLL, MANAGE_POLL, RESULTS } = URL_PATH;

export const activeStyle = {
  // backgroundColor: "rgba(0, 0, 0, 10%)",
  backgroundColor: "rgb(70 110 135)",
  color: "#fff",
};


export const mainListItems = (
  <>
    <ListItemButton
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      component={NavLink}
      to={DASHBOARD}
    >
      <ListItemIcon sx={{ color: "inherit" }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      component={NavLink}
      to={RESULTS}
    >
      <ListItemIcon sx={{ color: "inherit" }}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Results" />
    </ListItemButton>
    <ListItemButton
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      component={NavLink}
      to={`${MANAGE_POLL}/${CREATE_POLL}`}
    >
      <ListItemIcon sx={{ color: "inherit" }}>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Polls" />
    </ListItemButton>
  </>
);

