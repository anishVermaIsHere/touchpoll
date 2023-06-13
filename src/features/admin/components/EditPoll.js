import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { createPollSchema } from '../../../utils/validation/validation-schema';
import { editPoll } from '../../../utils/redux/slices/polls/poll-slice';
import {Navigate,  useParams} from 'react-router-dom';
import {Box, Button, Fab, FormControl,Input, Typography, TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TabPanel } from './ManagePoll';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { handleSnackBar } from '../../../utils/redux/slices/snackbar/snackbar-slice';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../utils/services/firebase/auth/config";
import { URL_PATH } from '../../../config/constants/routeslinks';


const {ALL_POLLS}=URL_PATH;

const EditPoll = () => {
    const params=useParams();
    const dispatch = useDispatch();
    const pollData = useSelector(state => state.pollSlice.allPolls).filter(p=>p._id==params.id);
    const [data,setData]=useState(pollData[0]);
    const [show,setShow]=useState(false);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(data.image);
    const [add, setAdd] = useState(false);
    const options=[];
    data.options.map(p=>options.push(p.option))

    const [toast, setToast] = useState({
        switch: false,
        message: '',
        style: ''
    });
    const toastClose = () => {
        setToast({ switch: false, message: '', style: '' })
    }

    const message = useSelector(state => state.pollSlice.message);
    const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
    const uploadFile = () => {
        if (image === null) {
            return;
        }
        else {
            const storageRef = ref(storage, 'images/' + 'image-' + Date.now() + Math.round(Math.random() * 1E9));
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log('error while uploading image...')
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                    });
                }
            );
        }
    }

    const formik = useFormik({
        initialValues: {
            ques: data.question,
            options: options,
            endDate: data.expiry_date
        },
        validationSchema: createPollSchema,
        onSubmit: (values, { resetForm }) => {
            let formData = {};
            const id=params.id;
            formData.question = values.ques;
            formData.expiry_date = values.endDate;
            formData.image = url;
            formData.options = values.options.map(opt => {
                return { option: opt, votes: 0 }
            })
            dispatch(editPoll({formData,id}));
            setImage(null);
        }
    });

    useEffect(() => {
        uploadFile()
    }, [image]);

    useEffect(() => {
        formik.values.options.map((p, i) => {
            if (i >= 9) {
                dispatch(handleSnackBar({
                    snackOpen: true,
                    snackType: "error",
                    snackMessage: "You can add upto 10 options only!"
                }));
                setAdd(true);
            }
            else {
                dispatch(handleSnackBar({
                    snackOpen: false,
                    snackType: "error",
                    snackMessage: ""
                }));
                setAdd(false);
            }
        })
    }, [formik.values.options])

    useEffect(() => {
        message !== null || undefined ?
            dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: message }))
            :
            dispatch(handleSnackBar({ snackOpen: false, snackType: "success", snackMessage: null }))
    }, [message])

    return (
        <TabPanel value={0} index={0}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Edit Poll
            </Typography>
            {data.voted.length==0?
            <Box sx={{ maxWidth: '100%' }}>
                <FormikProvider value={formik}>
                    <FormControl fullWidth component="form" onSubmit={formik.handleSubmit}>
                        <Typography component='p' variant='p' mt={2}>Question</Typography>
                        <TextField fullWidth
                            label="Question..."
                            autoComplete='off'
                            name="ques"
                            value={formik.values.ques}
                            onChange={formik.handleChange}
                            sx={{ maxWidth: '100%' }}
                            id="ques" size='small' margin='dense'
                            error={formik.touched.ques && Boolean(formik.errors.ques)}
                            helperText={formik.touched.ques && formik.errors.ques} />

                        <Typography component='p' variant='p' mt={2}>Image</Typography>
                        <Typography component='div' sx={{ display: 'flex', margin: '4px 0', alignItems: 'center' }}>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.currentTarget.files[0])}
                                size="small"
                                inputComponent="input"
                            />
                        </Typography>
                        
                        <Typography component='p' variant='p' mt={2}>Options</Typography>
                        <FieldArray name="options" render={(arrayHelpers) => (
                            <>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: { md: 800, lg: 950 } }}>
                                    {formik.values.options.map((opt, i) => {
                                        return <Typography component='div' key={i} sx={{ display: 'flex', minWidth: { xs: '100%', md: '25%' }, alignItems: 'center' }}>
                                            <TextField
                                                // sx={{ maxWidth: { xs: '300px', md: '400px' } }}
                                                autoComplete='off'
                                                value={formik.values.options[i]}
                                                name={`options[${i}]`}
                                                label={`Option ${i + 1}`}
                                                id={`option${i + 1}`}
                                                onChange={formik.handleChange}
                                                size='small'
                                                margin='dense'
                                            />
                                            {i > 1 ?
                                                <Fab sx={{ margin: '0 4px', minHeight: '30px', height: '30px', width: '30px' }}
                                                    size="small" color="error" aria-label="remove" onClick={() => arrayHelpers.remove(i)}>
                                                    <RemoveIcon />
                                                </Fab> :
                                                ""}
                                        </Typography>
                                    })}
                                </Box>
                                <Typography component='div' variant='p' mb={1} mt={3}>Add Option
                                    <Fab sx={{ margin: '0 4px', minHeight: '30px', height: '30px', width: '30px' }}
                                        size="small" color="primary" aria-label="add" disabled={add}
                                        onClick={() => arrayHelpers.push("")}>
                                        <AddIcon />
                                    </Fab>
                                </Typography>
                            </>
                        )} />
                        <Typography component='p' variant='p' mt={2}>Expires on</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disablePast
                                inputFormat="DD/MM/YYYY"
                                openTo="day"
                                // views={['year', 'month', 'day']}
                                // format={['day', 'month', 'year']}
                                onChange={(value) => formik.setFieldValue('endDate', value.$d.toLocaleDateString())}
                                value={formik.values.endDate}
                                renderInput={(params) => <TextField
                                    value={formik.values.endDate}
                                    name="endDate"
                                    size="small"
                                    sx={{ maxWidth: { xs: '300px', md: '400px' } }}
                                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                    helperText={formik.touched.endDate && formik.errors.endDate}  {...params} />}
                            />
                        </LocalizationProvider>

                        <Box mt={5}>
                            <Button variant="contained" type="submit" color="success" sx={{ marginRight: '0.8rem', textTransform:'none' }}>
                                Update
                            </Button>
                        </Box>
                    </FormControl>
                </FormikProvider>
            </Box>
            :
            <Navigate to={ALL_POLLS}/>
            }
        </TabPanel>
    )
}

export default EditPoll