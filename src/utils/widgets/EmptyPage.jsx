import * as React from 'react';
import { Grid, Typography, Paper, styled} from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const EmptyPage = (props) => {
    const {message}=props;
    return (
        <>
            <Grid item xs={12} sx={{padding:'25px 40px', }}>
                <Item elevation={0} sx={{background:'inherit'}}>
                    <HourglassEmptyIcon fontSize='large' />
                    <Typography variant='h4' p={1}gutterBottom>
                        Empty
                    </Typography>
                    <Typography variant='h6' gutterBottom>
                        {message}
                    </Typography>
                </Item>
            </Grid>
        </>
    )
}

export default EmptyPage;