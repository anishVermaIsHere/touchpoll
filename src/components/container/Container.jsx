import React from 'react';
import { Container as BoxContainer } from '@mui/material';
import AppRoutes from '../../utils/routes/AppRoutes';



const Container = () => {
    return (
        <div 
        style={{        
            minHeight:'1150px',        
            margin:'80px 0'
        }} 
        >
            {AppRoutes()}
        </div>

    )
}

export default Container;
