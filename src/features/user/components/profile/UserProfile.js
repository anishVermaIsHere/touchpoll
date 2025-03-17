import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Box, Container, Tabs, Tab } from "@mui/material";
import { tabStyle, a11yProps } from "../../../admin/components/ManagePoll";
import { PROFILE } from "../../../../config/routes/AppRoutes";

const UserProfile = () => {
  const [value, setValue] = React.useState(0);
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4, background: "#fff" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabs}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            component={NavLink}
            to={PROFILE}
            sx={tabStyle}
            label="Profile"
            {...a11yProps(value)}
          />
        </Tabs>
      </Box>
      <Outlet />
    </Container>
  );
};

export default UserProfile;
