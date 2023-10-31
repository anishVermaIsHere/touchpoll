import React, { useState } from 'react';
import { Box, Container, Paper, Grid, Pagination, Stack, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPolls } from '../../../utils/redux/slices/polls/poll-slice';
import BarChartIcon from '@mui/icons-material/BarChart';
import ResultChart from './ResultChart';
import randomcolor from 'randomcolor';
import EmptyPage from '../../../utils/widgets/EmptyPage';
import Title from './Title';


const Result = () => {
    const dispatcher = useDispatch();
    const allPolls = useSelector(state => state.pollSlice.allPolls);
    const [result, setResult] = useState([]);

    // states for pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [pollsPerPage] = useState(5);
    const [page, setPage] = useState(Math.ceil(allPolls.length / pollsPerPage));
    const indexOfLastPolls = pollsPerPage * currentPage;
    const indexOfFirstPolls = indexOfLastPolls - pollsPerPage;

    const handlePages = (e, num) => {
        setCurrentPage(num);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); 
    }

    const handleResults = (id) => {
        setResult(prev => {
            const res = [...prev];
            res[id] = !prev[id];
            return res;
        })
    }

    React.useEffect(() => {
        dispatcher(getPolls());
        setResult(new Array(allPolls).fill(false));
    }, [])

    return <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Title>Poll Results</Title>
            {
                allPolls.length == 0 ?
                    <EmptyPage message="First create polls and then visit" />
                    :
                    allPolls.slice(indexOfFirstPolls, indexOfLastPolls).map((poll, ind) => {
                        return <Grid container spacing={3} sx={{ marginTop: '0.5rem' }} key={poll.uid}>
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography component="div" sx={{ display: 'flex', flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: 'center', }}>
                                        <Typography variant="p">
                                            {poll.question}
                                        </Typography>
                                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }} color="primary" onClick={() => handleResults(ind)}>{result[ind] ? "Hide Result" : "Show Result"}<BarChartIcon /></Button>

                                    </Typography>
                                    {result[ind] && <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: { xs: 'auto', sm: 'auto' },
                                            height: 300
                                        }}>
                                        <ResultChart data={poll.options} question={`${ind + 1}. ${poll.question}`} color={randomcolor()} />
                                    </Paper>}
                                </Paper>
                            </Grid>
                        </Grid>
                    })}
            {allPolls.length > pollsPerPage ?
                <Stack spacing={2} mt={2}>
                    <Pagination count={page} page={currentPage} onChange={handlePages} size="medium" variant="outlined" shape="rounded" />
                </Stack> : ""}
        </Container>
    </Box>
}

export default Result