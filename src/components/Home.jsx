import { Box, Button,Paper, Typography, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import homebg from '../assets/images/homebg.jpg'
import {NavLink} from 'react-router-dom';
import { URL_PATH } from '../config/constants/routeslinks';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
    const {SIGNIN,POLL_SECTION}=URL_PATH;
    const token=useSelector(state=>state.userSlice.auth.token);
    return (
        <>
            <Box sx={{ flexGrow: 1,margin:'-50px 0 -80px 0',backgroundImage:`url(${homebg})`, backgroundSize:'cover'}}>
            <Grid container sx={{height:'100vh'}}>
                <Item elevation={0} sx={{margin:'auto', background:'none'}}>
                    <Typography variant='h1' sx={{mb:5, color:'#f2f2f2'}}>
                        Live Polling
                    </Typography>
                    <Button variant='contained' size='large' component={NavLink} to={token?POLL_SECTION:SIGNIN}>
                       Get Started
                    </Button>
                </Item>                
            </Grid>
            </Box>
        </>
    )
}

export default Home