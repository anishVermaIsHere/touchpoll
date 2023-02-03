import React, { useEffect } from 'react';
import { Paper, Box, Typography, Button, Divider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { signUpSchema } from '../../../../utils/validation/validation-schema';
import EditIcon from '@mui/icons-material/Edit';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useHistory } from 'react-router-dom';
import { URL_PATH } from '../../../../utils/routes/constants/routeslinks';
import { useSelector, useDispatch } from 'react-redux';
import { changePasswordSchema } from '../../../../utils/validation/validation-schema';
import { handleSnackBar } from '../../../../utils/redux/slices/snackbar/snackbar-slice';
import { changePassword } from '../../../../utils/services/api/user-api';


const Profile = () => {
    const auth = useSelector(state => state.userSlice.auth);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [edit, setEdit] = React.useState(true);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: changePasswordSchema,
        onSubmit: (values, { resetForm }) => {
            const passwords = {
                password: values.oldPassword,
                newPassword: values.newPassword
            }
            const response = changePassword(passwords);
            response.then(res => {
                dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }));
                if(res.statusText==='OK'){
                    localStorage.removeItem("user-info");
                    navigate(URL_PATH.SIGNIN);
                }
                else {}
            }).catch(err => dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: err.message })));
            // resetForm({ values: '' });
        }
    });

    useEffect(()=>{

    })

    const toggleEdit = (val) => {
        setEdit(val);
    }
    return (
        <>
            <Box sx={{ flexGrow: 1, margin: { xs: '2rem 0', md: '2rem' } }}>
                <Paper
                    sx={{
                        padding: '0.8rem',
                        background: '#fafafa',
                        boxShadow: 'none',
                        border: '1px solid #ddd',
                        // display: 'flex',
                        // justifyContent: 'space-between',
                        // alignItems: 'center'
                    }}
                >
                    <Typography align="left" component='p' variant='p' color='primary' sx={{ flexGrow: 1 }}>
                        Personal Details
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box>
                        <Typography align="left" component='p' variant='p'>
                            Name:  <Typography variant="span" color="primary">{auth.name}</Typography>
                        </Typography>

                        <Typography sx={{ display: 'block' }} component='p' variant='p' mt={2}>
                            Email: <Typography variant="span" color="primary">{auth.email}</Typography> <CheckCircleIcon sx={{ verticalAlign: 'middle' }} color='success' />
                        </Typography>
                        <Typography component='small' color='error' variant='small'>
                            {/* expired on: {poll.expiry_date.substr(0, 10)} */}
                        </Typography>
                    </Box>


                </Paper>

                <Paper
                    sx={{
                        padding: '0.8rem',
                        background: '#fafafa',
                        boxShadow: 'none',
                        border: '1px solid #ddd',
                        marginTop: 5,
                    }}
                >
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography align="left" component='p' variant='p' color='primary' sx={{ flexGrow: 1 }}>
                                Change Password
                            </Typography>
                            {edit ? <EditIcon size='small' color='primary' sx={{ cursor: 'pointer' }} onClick={(e) => toggleEdit(false)} />
                                :
                                <CancelPresentationIcon size='small' color='error' sx={{ cursor: 'pointer' }} onClick={(e) => toggleEdit(true)} />}
                        </Box>

                        {!edit && <>
                            <Divider sx={{ my: 1 }} />
                            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="oldPassword"
                                    label="Old Password"
                                    type="password"
                                    id="oldPassword"
                                    size="small"
                                    autoComplete="password"
                                    sx={{ background: '#fff' }}
                                    value={formik.values.oldPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                    helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    id="newPassword"
                                    size="small"
                                    autoComplete="password"
                                    sx={{ background: '#fff' }}
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    size="small"
                                    autoComplete="password"
                                    sx={{ background: '#fff' }}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    color='success'
                                    size="small"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, textTransform: 'none' }}
                                >
                                    Update
                                </Button>
                            </Box>
                        </>}

                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default Profile