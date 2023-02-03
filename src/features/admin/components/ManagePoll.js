import React, { useState} from 'react';
import {Box, Container, Typography, Tab, Tabs} from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink, Outlet} from 'react-router-dom';
import { URL_PATH } from '../../../utils/routes/constants/routeslinks';

const { CREATE_POLL, ALL_POLLS } = URL_PATH;

export function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: { md: 3 }, height: '100vh', overflow: 'auto' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const tabStyle = {
    textTransform: 'none',
    fontSize: '1rem'
}

const ManagePoll = (props) => {
    const [value, setValue] = useState(0);
    const handleTabs = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Container maxWidth="lg" sx={{mb: 4, background: '#fff' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleTabs} aria-label="basic tabs example" centered>
                        <Tab component={NavLink} to={CREATE_POLL} sx={tabStyle} label="Create" {...a11yProps(value)} />
                        <Tab component={NavLink} to={ALL_POLLS} sx={tabStyle} label="Manage" {...a11yProps(value)} />
                    </Tabs>
                </Box>
                <Outlet />
                
            </Container>
        </>
    )
}

export default ManagePoll