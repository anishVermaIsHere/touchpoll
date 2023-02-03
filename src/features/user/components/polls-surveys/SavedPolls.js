import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Button, Card, CardMedia, Paper, Typography, FormControl,
  FormLabel, FormControlLabel, RadioGroup, Radio, TextField
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Outlet, useLocation,useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {getPolls} from '../../../../utils/redux/slices/polls/poll-slice';
import { fetchPolls } from '../../../../utils/services/api/polls-api';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { grey, green} from '@mui/material/colors';


const randomColor=()=>{
  // return '#'+Math.floor(Math.random()*267715).toString();
  let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  
  }
                                                  // custom theme
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins',
        'Arial',
        'sans-serif',
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
      ].join(','),
      button: {
        textTransform: 'none'
      }
    },
    palette: {
      primary: {
        main: grey[400],
      },
      secondary: {
        main: green[400],
      },
    }
  });
                                                  // Progress Bar 
  
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  width:350,
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? 'success' : '#308fe8',
  },
}));

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
      <Box sx={{ width: {xs:'100%',sm:300,md:580, lg:750}, mr: 1 }}>
        <LinearProgress sx={{height:23, background:'#f2f2f2', borderRadius:'12px'}} color='secondary' variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.primary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

                                                  // Main Component 

const SavedPolls= () => {

 // state initialization
  const [pollState, setPollState] = useState({ poll: [], loading: true });
  const [pollAns,setPollAns]=useState({});
  const [voted, setVoted]=useState({});

  // extract parameter from URL
  const path = useLocation();
  let fPath= path.pathname;
  let pathArr=fPath.split('/');
  pathArr=pathArr.slice(1);

  const getQuestions = () => {
    const response = fetchPolls();
    response.then(res => {
      let filtPoll=res.data.polls.filter(i=>i.id==pathArr[3]);
      console.log(res.data)
      setPollState({
        poll: filtPoll,
        loading: false
      });

    })
      .catch(error => console.log('api error', error)).finally(() => { })
  }
  const handleChange = (event,id, title) => {
    setVoted(prev=>{
      const vote=prev;
      vote[id+1]=event.target.value;
      return vote;
    })
    setPollAns({
      pollTitle:title,...pollAns, [id]:event.target.value
    });
  };

  const submitPolls = () => {
      setTimeout(alert(JSON.stringify(pollAns)),2000)
  }

  useEffect(() => {
    getQuestions();
  }, [])
  

return (
  <>
    <ThemeProvider theme={theme}>
  <Box sx={{ flexGrow: 1}}>
    <Item sx={{ '& > :not(style)': { m: 4 },}}>
    {pollState.poll.map(pq=>{
    return (<>
    <Typography component='div' gutterBottom>
        <Card align='left' sx={{ maxHeight: 80, maxWidth: 100 }}>
        <CardMedia component="img" image={pq.cover} alt={pq.title} />
        </Card>
        <Typography component='div' gutterBottom>
            <Typography align='left' variant='h6'>{pq.title}</Typography>
            {/* <Typography align='right' component='p'>Closed on {pq.end_date}</Typography> */}
        </Typography>
    </Typography>
    
      {pq.question_set.map((p,ind)=>{
        return <>
          <Paper 
          maxWidth={300}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection:{xs:'column',sm:'row'},
              textAlign: 'left',
              background: '#eeeeee5c',
              padding: '1.3rem'
            }}>
            <FormControl>
              <FormLabel color='success' id={`demo-radio-buttons-group-label${ind + 1}`} key={p.id}
                sx={{ marginBottom: '0.5rem', fontWeight: '600' }}>
                {ind + 1}. {p.question}
              </FormLabel>
              <RadioGroup
                aria-labelledby={`demo-radio-buttons-group-label${ind + 1}`}
                name={`radio-buttons-group${ind+1}`}
                key={ind}
                value={voted[ind+1]}
                onChange={(event)=>handleChange(event,ind,pq.title)}
              >
                {p.options.map((option, index) => {
                  return (
                    <>
                    <FormControlLabel key={index} value={option} 
                      control={ <Radio
                      color='success'
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon />} />} 
                    label={option} />
                    {/* <Box component='div' sx={{display:'flex'}}> */}
                    <LinearProgressWithLabel value={Math.floor(Math.random()*100)} />
                    {/* <Typography 
                    variant='span' 
                    sx={{
                      fontSize:'1rem',
                      ml:2 
                    }}>
                      {index+5.9}
                    </Typography> */}
                    {/* </Box> */}
                    </>
                    
                  )
                })}
              </RadioGroup>
            </FormControl>
            <Box>
              {p.image ? 
              <Card align='left' sx={{ maxWidth: {xs:110, md:150}}}>
                <CardMedia
                  component="img"
                  image={p.image}
                  alt='question pic'
                />
              </Card> : ""}
            </Box>
          </Paper>
        </>
        })}
    </>)
    })
}
   </Item>
  </Box>
  <Outlet />
  </ThemeProvider>
  </>
)
  
}
export default SavedPolls;