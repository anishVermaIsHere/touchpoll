import React, { useState } from 'react';
import { Box, Container, Paper, Grid, Pagination, Stack, Typography } from '@mui/material';
import { fetchPolls } from '../../../utils/services/api/polls-api';
import { useDispatch } from 'react-redux';
import { handleSnackBar } from '../../../utils/redux/slices/snackbar/snackbar-slice';
import ResultChart from './ResultChart';
import randomcolor from 'randomcolor';


const PollResults = () => {
  const dispatcher = useDispatch();
  const [polls, setPolls] = React.useState({ poll: [], loading: true });
  // states for pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [pollsPerPage] = useState(5);
  const [page, setPage] = useState(Math.ceil(polls.poll.length / pollsPerPage));
  const indexOfLastPolls = pollsPerPage * currentPage;
  const indexOfFirstPolls = indexOfLastPolls - pollsPerPage;

  const handlePages = (e, num) => {
    setCurrentPage(num);
  }

  React.useEffect(() => {
    const response = fetchPolls();
    response.then(res => {
      const sortedData = res.data.polls.sort((x, y) => {
        const date1 = y.created_date.substr(0, 10);
        const date2 = x.created_date.substr(0, 10);
        return new Date(date1) - new Date(date2) ? -1 : 1;
      })
      setPolls({ loading: false, poll: sortedData })
    }).catch(err => dispatcher(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: err.message })));
  }, [])

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {polls.poll.map((poll, ind) => {
          return <Grid container spacing={3} sx={{ marginTop: '30px' }}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 300,
                }}
              >
                <ResultChart data={poll.options} question={`${ind + 1}. ${poll.question}`} color={randomcolor()} />
              </Paper>
            </Grid>

          </Grid>
        })}
        {/* {polls.poll.length > pollsPerPage ?
          <Stack spacing={2} mt={2}>
            <Pagination count={page} page={currentPage} onChange={handlePages} size="small" variant="outlined" shape="rounded" />
          </Stack> : ""} */}
      </Container>
    </Box>
  )
}

export default PollResults