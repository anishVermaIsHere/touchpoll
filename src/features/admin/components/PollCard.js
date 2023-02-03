import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function PollCard({total,label}) {
  return (
    <div>
      <Title>{label}</Title>
      <Typography component="h3" variant="h3">
        {total}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       on {`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} `}
      </Typography>
    </div>
  );
}