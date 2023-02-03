import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Fab, Grid, Input, Paper, styled, Typography, Tab, Tabs, TextField } from '@mui/material'
import { navbarColor } from '../../../components/header/NavBar';
import PropTypes from 'prop-types';



function TabPanel(props) {
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
                <Box sx={{ p: 3 }}>
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const tabStyle = {
    textTransform: 'none',
    fontSize: '1rem'
}


const CreateSurvey = (props) => {

    const [poll, setPoll] = useState({ ques: ['',], option: ['', ''] });
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addQuestion = () => {

    }
    const addOption = () => {

    }
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, background: '#fff' }}>
            {/* <Typography component="p" variant="p" p={1} mb={5} color="text.secondary" sx={{ flex: 1, backgroundImage: navbarColor, color: '#fff' }}>
                Create Poll
            </Typography> */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab sx={tabStyle} label="Create" {...a11yProps(0)} />
                    <Tab sx={tabStyle} label="Manage" {...a11yProps(1)} />
                    {/* <Tab sx={tabStyle} label="Update Survey" {...a11yProps(2)} /> */}

                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Create Survey
                </Typography>
                <Box
                    sx={{
                        // width: 700,
                        maxWidth: '100%',
                    }}
                >
                    {/* <Typography component='p' variant='p'>Question</Typography> */}
                    <TextField fullWidth label="Question..." id="question" size='small' margin='dense' />

                    <Input
                    id="image"
                    label="Upload Image"
                    name="image"
                    type="file"
                    size="small"
                    inputComponent="input"
                    sx={{margin:'4px 0'}}
                    />

                    {/* <Typography component='p' variant='p' mt={2}>Option</Typography> */}
                    <TextField fullWidth label="Option 1..." id="option" size='small' margin='dense' />

                    {/* <Typography component='p' variant='p' mt={2}>Option</Typography> */}
                    <TextField fullWidth label="Option 2..." id="option" size='small' margin='dense' />

                    <Typography component='p' variant='p' mb={1} mt={3}>Add Option
                        <Fab sx={{ margin: '0 4px' }} size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Typography>

                    <Box mt={5}>
                        <Button variant="outlined" color="success" sx={{ marginRight: '0.8rem', textTransform:'none' }}>Submit</Button>
                        <Button variant="contained" color="error">Cancel</Button>
                    </Box>
                    <Box mt={5}>
                        <Button variant="contained" color="primary" sx={{ marginRight: '0.8rem', textTransform:'none' }}>Next</Button>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>Edit & Delete</TabPanel>
            {/* <TabPanel value={value} index={2}>Update Survey</TabPanel> */}

        </Container>
    )
}

export default CreateSurvey