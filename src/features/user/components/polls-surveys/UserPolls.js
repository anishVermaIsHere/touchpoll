import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {Box, Button, Card, CardContent, CardMedia, Paper, Typography, FormControl,
  FormControlLabel, RadioGroup, Radio, Skeleton} from '@mui/material/';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchOnePoll, pollSubmit } from '../../../../utils/services/api/polls-api';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { handleSnackBar } from '../../../../utils/redux/slices/snackbar/snackbar-slice';
import LinearProgress from '@mui/material/LinearProgress';
import randomcolor from 'randomcolor';
import defaultImage from '../../../../assets/images/poll-default.jpg';
import sadEmoji from '../../../../assets/images/sad-emoji.svg';
import { URL_PATH } from '../../../../config/constants/routeslinks';



const {POLL_SECTION}=URL_PATH;
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
  palette: {
    success: {
      main: randomcolor()
    }
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 360,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress sx={{ height: 15, background: '#f2f2f2', borderRadius: '12px' }} color="success" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="p">
          {Math.round(props.value)}%
        </Typography>
      </Box>
    </Box>
  );
}

const UserPolls = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // state initialization
  const [pollState, setPollState] = useState({ poll: [], totalVotes: 0, loading: true });
  const [valid, setValid] = useState(false);
  const [disable, setDisable] = useState(false);
  const [resultBar, setResultBar] = useState(false);
  const [selected, setSelected] = useState(null);

  const getTotalVotes = () => {
    let options = [];
    pollState.poll.map(poll => options = poll.options);
    let total = options.reduce((prev, curr) => prev + curr.votes, 0);
    setPollState({ ...pollState, totalVotes: total });
  }

  // fetch poll 
  const getPoll = (params) => {
    const response = fetchOnePoll(params);
    response.then((res) => {
      let options = [];
      res.data.poll.filter(poll => options = poll.options)

      const validPolls = res.data.poll.filter(poll => {
        if (new Date(poll.expiry_date) > new Date()) {
          setValid(true)
          return poll
        } else {
          setValid(false)
          return poll
        }
      })
      let total = options.reduce((prev, curr) => prev + curr.votes, 0);
      setPollState({
        poll: validPolls,
        totalVotes: total,
        loading: false
      });
     
      if (valid) {
        if (res.data.voted) {
          setDisable(true);
          dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: "You have already voted" }))
        }
        else {
          setDisable(false);
          dispatch(handleSnackBar({ snackOpen: false, snackType: "error", snackMessage: "" }))
        }
      }
      else {}
    }).catch(err => {
      dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: err.message }))
    });
  }


  // submit poll
  const submitPoll = (e) => {
    setSelected(e.target.value);
    const poll = { answer: e.target.value, pollid: params.id }
    const response = pollSubmit(poll);
    response.then(res => {
      if (res.status == 200) {
        setDisable(true);
        setResultBar(true);
      }
      if (res.status == 403) {
        setDisable(true);
        setResultBar(false);
      }
      dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }))
    }).catch(err =>err);
  }

  // side effect 
  useEffect(() => {
    getPoll(params);
    if (selected !== null) {
      getTotalVotes();
    }
  }, [selected]);


  const pollSkeleton = (poll) => {
    return <Box sx={{ flexGrow: 1 }}>
      <Item>
        <Card sx={{ boxShadow: 'none', maxHeight: 1000, maxWidth: 400, margin: 'auto' }}>
          <CardContent sx={{ margin: '2rem auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Skeleton variant="rectangular" width="60%" height={120} />
            <Skeleton variant="text" width="100%" height={40} />
            {poll.options.map(opt => <Skeleton variant="text" width="100%" height={65} />)}
          </CardContent>
        </Card>
      </Item>
    </Box>
  }

  const pollCard = (poll, ind) => {
    return <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {valid ? <Item elevation={0} key={poll.uid}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', boxShadow: 'none' }}>
            <Typography
              align='right'
              variant='p'
              component='p'
              sx={{
                padding: '0 1.2rem',
                marginBottom: '1rem',
              }}
            >
              Expires on {poll.expiry_date.substr(0, 10)}
            </Typography>
            <Card align='center' sx={{ margin: '0 auto', width: { xs: 100, sm: 150, md: 200 } }}>
              <CardMedia
                component="img"
                image={poll.image === "" || poll.image === null ? defaultImage : poll.image}
                alt='question image'
              />
            </Card>
            <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.8rem 1rem' }}>
              <FormControl>
                <Typography
                  id={`demo-radio-buttons-group-label${ind + 1}`}
                  sx={{
                    width: { xs: 200, sm: 320, md: 400, lg: 400 },
                    margin: '0.5rem auto',
                    color: 'rgba(0, 0, 0, 0.67)',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>
                  {poll.question}
                </Typography>
                <RadioGroup
                  aria-labelledby={`demo-radio-buttons-group-label${ind + 1}`}
                  name={`radio-buttons-group${ind + 1}`}
                  key={ind}
                  value={selected}
                  onChange={submitPoll}
                >
                  {poll.options.map((opt, index) => {
                    return (
                      <>
                        <Paper key={'option'+index} elevation={3}
                          sx={{
                            margin: '0.5rem 0',
                            padding: '0.8rem',
                            width: { sm: "auto", lg: 400 },
                            display: 'flex',
                            justifyContent: 'spaceBetween',
                            flexDirection: 'column',
                            background: '#eeeeee5c',
                          }}>
                          <FormControlLabel key={index} value={opt.option}
                            control={<Radio
                              color='success'
                              disabled={disable}
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<CheckCircleIcon />} />}
                            label={opt.option} />
                          {resultBar ?
                            <LinearProgressWithLabel
                              value={opt.votes==0?0:(opt.votes / pollState.totalVotes) * 100} />
                            : ""}
                        </Paper>
                      </>
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>
        </Item>
          :
          <>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '100px 20px' }}>
              <img src={sadEmoji} style={{ height: '150px' }} alt='sad emoji'/>
              <Typography variant="h5" p={5}>This Poll is no longer </Typography>
              <Button variant="outlined" sx={{ margin: 'auto' }} component={NavLink} to={POLL_SECTION}>Go back</Button>
            </Box>
          </>
        }
      </Box>
    </ThemeProvider>
  }

  return pollState.poll.map((pq, ind) => pollState.loading ? pollSkeleton(pq) : pollCard(pq, ind))

}

export default UserPolls;
