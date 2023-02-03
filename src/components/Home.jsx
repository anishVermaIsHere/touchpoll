import React from 'react'
import { Box, Button,Paper, Typography, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {home} from '../utils/constants/images';
import {NavLink} from 'react-router-dom';
import { URL_PATH } from '../utils/routes/constants/routeslinks';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
    const {background}=home;
    const {SIGNIN,DEMO_POLL}=URL_PATH;
    const token=useSelector(state=>state.userSlice.auth.token);
    return (
        <>
            <Box sx={{ flexGrow: 1,backgroundImage:`url(${background.url})`, backgroundSize:'cover'}}>
            <Grid container sx={{height:'100vh'}}>
                <Item elevation={0} sx={{margin:'auto', background:'none'}}>
                    <Typography variant='h1' sx={{mb:5}}>
                        Live Polling
                    </Typography>
                    <Button variant='contained' size='large' component={NavLink} to={token?DEMO_POLL:SIGNIN}>
                       Get Started
                    </Button>
                </Item>                
            </Grid>
            </Box>
        </>
    )
}

export default Home