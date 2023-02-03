import React from 'react';
import { Paper, Box, Typography, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProfileManage = () => {
    const auth=useSelector(state=>state.userSlice.auth);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Paper
                    sx={{
                        padding: '0.8rem',
                        background: '#fafafa',
                        boxShadow: 'none',
                        border: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Typography align="left" component='p' variant='p' color='primary' sx={{ flexGrow: 1 }}>
                            {auth.name}
                        </Typography>
                        
                        <Typography sx={{ display: 'block' }} component='small' variant='small'>
                            email: {auth.email} <CheckCircleIcon sx={{ verticalAlign: 'middle', fontSize: '1rem', height: '1rem', width: '1rem' }} color='success' />
                        </Typography>
                        <Typography component='small' color='error' variant='small'>
                            {/* expired on: {poll.expiry_date.substr(0, 10)} */}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'column' } }}>
                        <NavLink to="" title="Edit">
                            <EditIcon size='small' color='primary' sx={{ cursor: 'pointer' }} />
                        </NavLink> 
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default ProfileManage