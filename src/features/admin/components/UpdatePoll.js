import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { createPollSchema } from '../../../utils/validation/validation-schema';
import { createPoll } from '../../../utils/redux/slices/polls/poll-slice';
import Alert from '@mui/material/Alert';
import {
    Box, Button, Fab, FormControl,
    Grid, Input, Typography, TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TabPanel } from './ManagePoll';

const CreatePoll = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            uid:uuidv4(),
            ques: '',
            image: null,
            options: ['', '']
        },
        validationSchema: createPollSchema,
        onSubmit: (values) => {
            dispatch(createPoll(values));
            alert(JSON.stringify(values));
            formik.values.uid = uuidv4();
            formik.values.ques = '';
            formik.values.image = null;
            formik.values.options = ['', ''];
        }
    });
    const [add, setAdd] = useState(false);

    useEffect(() => {
        formik.values.options.map((p, i) => {
            i >= 9 ? setAdd(true) :
                setAdd(false);
        })
    }, [formik.values.options])
    return (
            <TabPanel value={props.value} index={props.index}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Update Poll
                </Typography>
                <Box sx={{maxWidth: '100%'}}>
                    <FormikProvider value={formik}>
                        <FormControl fullWidth component="form" onSubmit={formik.handleSubmit}>
                            <Typography component='p' variant='p'>ID</Typography>
                            {/* <Typography component='p' variant='p' color='primary'>{formik.values.uid}</Typography> */}
                            <TextField disabled color='primary' sx={{background:'#f9f9f9',width:'400px'}} 
                                name="id" id="id" size="small" 
                                margin="dense" 
                                value={formik.values.uid}
                            />
                            <Typography component='p' variant='p' mt={2}>Question</Typography>
                            <TextField fullWidth
                                label="Question..."
                                autoComplete='off'
                                name="ques"
                                value={formik.values.ques}
                                onChange={formik.handleChange}
                                id="ques" size='small' margin='dense'
                                error={formik.touched.ques && Boolean(formik.errors.ques)}
                                helperText={formik.touched.ques && formik.errors.ques} />

                            <Typography component='p' variant='p' mt={2}>Image</Typography>
                            <Typography component='div' sx={{ display: 'flex', margin: '4px 0', alignItems: 'center' }}>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(e)=>formik.setFieldValue('image',e.currentTarget.files[0])}
                                    size="small"
                                    inputComponent="input"
                                />
                            </Typography>

                            <Typography component='p' variant='p' mt={2}>Options</Typography>
                            <FieldArray name="options" render={(arrayHelpers) => (
                                <>
                                    {formik.values.options.map((opt, i) => {
                                        return (i > 1 && i < 10) ?
                                            <>
                                                <Typography component='div' key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <TextField
                                                        sx={{ width: '400px' }}
                                                        autoComplete='off'
                                                        value={formik.values.options[i+2]}
                                                        name={`options[${i}]`}
                                                        label={`Option ${i + 1}`}
                                                        id={`option${i + 1}`}
                                                        onChange={formik.handleChange}
                                                        size='small'
                                                        margin='dense'
                                                    />

                                                    <Fab sx={{ margin: '0 4px', minHeight: '30px', height: '30px', width: '30px' }}
                                                        size="small" color="error" aria-label="remove" onClick={() => arrayHelpers.remove(i)}>
                                                        <RemoveIcon />
                                                    </Fab>
                                                </Typography>

                                            </>
                                            :
                                            <>
                                                <Typography component='div' sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <TextField
                                                        sx={{ width: '400px' }}
                                                        autoComplete='off'
                                                        value={formik.values.options[i]}
                                                        name={`options[${i}]`}
                                                        label={`Option ${i+1}`}
                                                        id='option1'
                                                        onChange={formik.handleChange}
                                                        size='small'
                                                        margin='dense'
                                                    />
                                                </Typography>
                                            </>
                                    })}
                                    {add ? <Typography variant="div" sx={{ width: 'auto' }}>
                                                <Alert severity="error">You can add upto 10 options only!</Alert>
                                            </Typography> : ''}
                                        <Typography component='p' variant='p' mb={1} mt={3}>Add Option
                                            <Fab sx={{ margin: '0 4px', minHeight: '30px', height: '30px', width: '30px' }}
                                                size="small" color="primary" aria-label="add" disabled={add} 
                                                onClick={() => arrayHelpers.push("")}>
                                                <AddIcon />
                                            </Fab>
                                        </Typography>
                                </>
                            )} />

                            <Box mt={5}>
                                <Button variant="outlined" type="submit" color="success" sx={{ marginRight: '0.8rem' }}>
                                    Save
                                </Button>
                                <Button variant="contained" color="error">Cancel</Button>
                            </Box>
                        </FormControl>
                    </FormikProvider>

                </Box>
            </TabPanel>
    )
}

export default CreatePoll