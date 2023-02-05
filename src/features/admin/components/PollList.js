import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box, Card, CardContent,InputBase, InputLabel, MenuItem, Pagination, Paper,
    Skeleton, Select, Stack, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TabPanel } from './ManagePoll';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkIcon from '@mui/icons-material/Link';
import CancelIcon from '@mui/icons-material/Cancel';
import { getPolls} from '../../../utils/redux/slices/polls/poll-slice';
import { pollDelete } from '../../../utils/services/api/polls-api';
import { NavLink } from 'react-router-dom';
import EmptyPage from '../../../utils/widgets/EmptyPage';
import { handleSnackBar } from '../../../utils/redux/slices/snackbar/snackbar-slice';
import { URL_PATH } from '../../../utils/routes/constants/routeslinks';
import copy from 'copy-to-clipboard';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `2px solid rgb(118, 118, 118)`,
    '&:hover': {
        borderWidth: `2px`,
        borderStyle: 'inset',
        borderColor: 'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
    },
    '&:focus': {
        border: `2px solid ${theme.palette.primary.main}`,
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '100%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
}));



const { EDIT_POLL, MANAGE_POLL} = URL_PATH;

const PollList = () => {

    // all states declaration
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const allPolls = useSelector(state => state.pollSlice.allPolls);
    const [polls, setPolls] = useState(allPolls)
    const loading = useSelector(state => state.pollSlice.loading);
    const [sort, setSort] = useState('new');
  
   // states for pagination 
   const [currentPage, setCurrentPage] = useState(1);
    const [pollsPerPage] = useState(12);
    const [page, setPage] = useState(Math.ceil(allPolls.length/pollsPerPage));
   const indexOfLastPolls=pollsPerPage*currentPage;
   const indexOfFirstPolls=indexOfLastPolls-pollsPerPage;


    // all handle functions
    const handleChange = (event) => {
        // due to the array is in strict mode, has used spread operator (clone)
        const value=event.target.value;
        setSort(value);
        if(value=='ascending'){
        const sortAsc=[...polls].sort((x,y)=>x.question>y.question?1:-1); 
            setPolls(sortAsc);
        }
        else if(value=='descending') {
            const sortDesc=[...polls].sort((x,y)=>x.question<y.question?1:-1); 
            setPolls(sortDesc);
        }
        else if(value=='new'){
            const sortNew=[...polls].sort((x,y)=>{
                let date1=y.created_date.substr(0, 10);
                let date2=x.created_date.substr(0, 10);
                return new Date(date2)-new Date(date1)?1:-1
            }); 
            setPolls(sortNew);
        }
         else if(value=='old'){
            const sortOld=[...polls].sort((x,y)=>{
                let date1=y.created_date.substr(0, 10);
                let date2=x.created_date.substr(0, 10);
                return new Date(date1)-new Date(date2)?1:-1
            }); 
            setPolls(sortOld);
        }
        else {
        return 0;
        }
    };

    const deletePoll=(id)=>{
        const response=pollDelete(id);
            response.then(res => {
                dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }));
            }).catch(err => dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: err.message })));
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value==='') {
            setPolls(allPolls);
        }
        else {
            setPolls(allPolls.filter(p => {
                return p.question.toLowerCase().includes(search.toLowerCase()) ? p : ""
            }))
        }
    }
    const handlePages=(e,num)=>{
        setCurrentPage(num);
    }

    const copyLink=(event,id)=>{
        const link=process.env.REACT_APP_BASE_URL+id;
        copy(link);
        dispatch(handleSnackBar({ snackOpen: true, snackType: "info", snackMessage: "Link Copied"}))
    }

    

    useEffect(() => {
        dispatch(getPolls());
    }, [])

    const pollList = () => {
        return polls.slice(indexOfFirstPolls,indexOfLastPolls).map((poll) => {
            return loading ?
                <Card align='left' sx={{ maxHeight: 120 }}>
                    <CardContent sx={{ marginBottom: '20%' }}>
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="20%" />
                        <Skeleton variant="text" width="10%" />
                    </CardContent>
                </Card>
                :
                <Paper
                    key={poll.uid}
                    sx={{
                        padding: '0.8rem',
                        background: '#fafafa',
                        boxShadow: 'none',
                        border: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Typography align="left" component='p' variant='p' color={new Date(poll.expiry_date)>new Date()?"primary":"error"} sx={{ flexGrow: 1 }}>
                            {poll.question}
                        </Typography>
                        <Typography fullWidth component='small' variant='small'>
                            voted: {poll.options.reduce((p,c)=>p+c.votes,0)} 
                        </Typography>
                        {new Date(poll.expiry_date)>new Date()?
                        <Typography sx={{ display: 'block' }} component='small' variant='small'>
                            status: active <CheckCircleIcon sx={{ verticalAlign: 'middle', fontSize: '1rem', height: '1rem', width: '1rem' }} color='success' />
                        </Typography>
                        :
                        <Typography sx={{ display: 'block' }} component='small' variant='small'>
                            status: expired <CancelIcon sx={{ verticalAlign: 'middle', fontSize: '1rem', height: '1rem', width: '1rem' }} color='error' />
                        </Typography>}
                        <Typography component='small' variant='small'>
                            expired on: {poll.expiry_date.substr(0, 10)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'column' } }}>
                        <LinkIcon size='small' onClick={(e)=>copyLink(e,poll._id)} color='primary' sx={{ marginLeft: '0.3rem', cursor: 'pointer' }} />
                        {poll.voted==0?
                        <NavLink to={`/admin/${MANAGE_POLL}/${EDIT_POLL}/${poll._id}`} title="Edit">
                            <EditIcon size='small' color='primary' sx={{ cursor: 'pointer' }} />
                        </NavLink>:
                        ""}
                            <DeleteIcon size='small' color='error' sx={{ marginLeft: '0.3rem', cursor: 'pointer' }} 
                            onClick={(e)=>deletePoll(poll._id)} />
                    </Box>
                </Paper>
        })
    }

    return (
        <>
           <Box sx={{ maxWidth: '100%'}}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    All Poll
                </Typography>
                <Search sx={{margin:{xs:'0'}}}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        id="search"
                        name="search"
                        small="size"
                        value={search}
                        fullWidth
                        onChange={handleSearch}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography mt={2} mr={4} align='right' variant='p' component='p'>
                        Total {polls.length}
                    </Typography>
                    {polls.length>pollsPerPage?
                    <Stack spacing={2} mt={2}>
                        <Pagination count={page} page={currentPage} onChange={handlePages} size="small" variant="outlined" shape="rounded" />
                    </Stack>: ""}

                    <Typography mt={2} sx={{display:'flex',alignItems:'center'}}variant='div' component='div'>
                        <InputLabel sx={{marginRight:'8px'}} id="select-label">Sort</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select-label"
                            size="small"
                            value={sort}
                            onChange={handleChange}
                            autoWidth
                            label="Sort"
                        >
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'ascending'}>Ascending</MenuItem>
                            <MenuItem value={'descending'}>Descending</MenuItem>
                            <MenuItem value={'new'}>New first </MenuItem>
                            <MenuItem value={"old"}>Old first</MenuItem>
                        </Select>
                    </Typography>

                </Box>                
            </Box>

            <TabPanel value={1} index={1}>
                <Box 
                sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: '100%'
                        },
                    }}
                >
                    {polls.length == 0 ? <EmptyPage message="No polls to manage" />: pollList()}

                </Box>
            </TabPanel>

            
        </>
    )
}

export default PollList