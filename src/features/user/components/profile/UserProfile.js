import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, Container, Paper, Tabs, Tab, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { tabStyle, a11yProps } from '../../../admin/components/ManagePoll';
import { PROFILE, PROFILE_MANAGE } from '../../../../utils/routes/AppRoutes';


const UserProfile = () => {
  const auth = useSelector(state => state.userSlice.auth);
  const [value, setValue] = React.useState(0);
    const handleTabs = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <Container maxWidth="lg" sx={{ mb: 4, background: '#fff' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabs} aria-label="basic tabs example" centered>
          <Tab component={NavLink} to={PROFILE} sx={tabStyle} label="Profile" {...a11yProps(value)} />
          {/* <Tab  component={NavLink} to={PROFILE_MANAGE} sx={tabStyle} label="Manage" {...a11yProps(value)} /> */}
        </Tabs>
      </Box>
      <Outlet />

    </Container>

  )
}

export default UserProfile