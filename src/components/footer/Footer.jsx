import React from 'react';
import {BsGithub} from 'react-icons/bs';
import { Box, Button, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <>
    <Box sx={{ position:'', right:0, left:0,bottom:0}}>
        <Toolbar 
        sx={{
          backgroundColor:'#08212df7',
          color:'#fff',
          display:'flex', 
          justifyContent:'center', 
          flexDirection:{
          xs:'column', 
          md:'row',
          fontSize:'0.9rem'
        }}}>
          
            <Typography variant='p' sx={{order:{xs:2 , md:1}, mt:1}}>
              Copyright © {new Date().getFullYear()} {process.env.REACT_APP_NAME}. All Rights Reserved
            </Typography>
            <Button sx={{order:{xs:1, md:2}, fontSize:'1.8rem', mt:'0.8rem', cursor:'pointer'}}>
              <a href="https://github.com/anishVermaIsHere" title="https://github.com/anishVermaIsHere" style={{color:'#fff'}}>
              <BsGithub />
              </a>
            </Button>
            <Typography variant='p' sx={{ order:{xs:3, md:3}, mt:1, textAlign:{xs:'center', md:'right'} }}>
                Designed and Developed by Anish Verma
            </Typography>
            
        </Toolbar>
    </Box>
    </>
  )
}

export default Footer