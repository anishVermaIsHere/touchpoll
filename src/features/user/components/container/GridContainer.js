import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box,Button,Paper} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import '../../../../assets/styles/PollApp.css';
import Typography from '@mui/material/Typography';
import { pollData } from '../../../../utils/constants/surveyPollsData';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GridContainer() {
  return (
   <Box sx={{ flexGrow: 1}}>
            <Typography variant='h6' pt={2} pl={5} gutterBottom>
              Open for Polling
            </Typography>
          <Item class='question-card'
                   sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 1
                    },
                  }}
                  >
                    {pollData.map((item,index)=>{
                      return(
                      <Paper className='paper' elevation={3}>
                        <Typography variant='p' class='ques'>
                          {item.name}
                        </Typography>
                      </Paper>
                      )
                    })
                           
                    }              
                      {/* <Typography variant='p' class='ques'>
                      </Typography> */}
                      {/* <Box> */}
                        {/* {item.set.map((ans,i)=>{
                          return(
                            <Button key={i} variant='contained' color='success' size='small'>
                              {ans.answers}
                            </Button>
                          )
                        })
                        } */}
                      {/* </Box> */}
                     
          </Item>

          <Typography variant='h6' pt={2} pl={5} gutterBottom>
              Closed 
          </Typography>

          <Item class='question-card'
                   sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 1
                    },
                  }}
                  >
                    {/* {survey.map((item,index)=>{
                      return(
                      <Paper className='paper' elevation={3}>
                        <Typography variant='p' class='ques'>
                          {item.name}
                        </Typography>
                      </Paper>
                      )
                    })} */}
          </Item>
     </Box>
  );
}
