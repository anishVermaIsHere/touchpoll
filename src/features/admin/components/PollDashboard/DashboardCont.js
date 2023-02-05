import React,{useEffect} from 'react';
import { Box, Container,Paper,Grid } from '@mui/material';
import Chart from '../Chart';
import PollCard from '../PollCard';
import PollTable from '../PollTable';
import EmptyPage from '../../../../utils/widgets/EmptyPage';
import { getPolls } from '../../../../utils/redux/slices/polls/poll-slice';
import { useDispatch,useSelector } from 'react-redux';
import randomcolor from 'randomcolor';

const randomColor=randomcolor();

const DashboardCont = () => {
  const polls=useSelector(state=>state.pollSlice.allPolls);
  const dispatch=useDispatch();
  
  let totalVotes=0;
  let totalOptions=0;
    polls.map(poll=>{
      totalVotes=totalVotes+poll.options.reduce((p,c)=>p+c.votes,0);
      totalOptions=totalOptions+poll.options.length;
    })
    
  useEffect(()=>{
    dispatch(getPolls());
  },[]);

   return( <>
   {polls.length==0?
    <EmptyPage message="First create polls and then visit" />
       :
       <Box component="main" sx={{flexGrow:1 }}>
       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  <Chart data={polls} color={randomColor} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    mb:2
                  }}
                >
                  <PollCard label="Total Votes" total={totalVotes} />
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    mb:2
                  }}
                >
                  <PollCard label="Total Questions" total={polls.length} />
                </Paper>
               
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <PollTable data={polls} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          </Box>
      }
      </>)
}

export default DashboardCont