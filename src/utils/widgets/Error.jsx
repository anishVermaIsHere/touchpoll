import React from 'react'
import { Grid, Typography, Paper, styled, Button} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { NavLink } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Error = (props) => {
    const {errCode, errMessage}=props;
    return (
        <Grid item xs={12}>
            <Item elevation={0}>
                <ErrorOutlineIcon sx={{fontSize:'100px'}}/>
                <Typography variant='h2' pl={6} p={0.25} gutterBottom>
                    {errCode}
                </Typography>
                <Typography variant='h5' pl={6} p={0.25} gutterBottom>
                    {errMessage}
                </Typography>
                
                <Button 
                variant='outlined'
                component={NavLink} 
                to='/'>
                Go to Home
                </Button>
            </Item>
        </Grid>
    )
}

export default Error