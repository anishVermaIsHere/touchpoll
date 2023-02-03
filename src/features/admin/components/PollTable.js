import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Box } from '@mui/material';


export default function PollTable(props) {
  const {data}=props;

  return (
    <React.Fragment>
      <Box sx={{overflow:'auto', maxHeight:'500px'}}>
      <Title>Recent Polls</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Question</TableCell>
            <TableCell align="right">Total Votes</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow key={row.uid}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{row.question}</TableCell>
              <TableCell align="right">{row.options.reduce((p,c)=>p+c.votes,0)}</TableCell>
              <TableCell>{row.created_date.substr(0,10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      </Box>
    </React.Fragment>
  );
}