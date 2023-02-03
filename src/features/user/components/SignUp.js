import * as React from 'react';
import {useFormik} from 'formik';
import { signUpSchema } from '../../../utils/validation/validation-schema';
import { CONSTANTS } from '../../../utils/constants/constants';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../../assets/images/hand-click-1299.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userSignup } from '../../../utils/services/api/user-api';
import { grey} from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { handleSnackBar } from '../../../utils/redux/slices/snackbar/snackbar-slice';


const {SIGNUP}=CONSTANTS;

export const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    secondary: {
      main: grey[800],
      contrastText: '#fff'
    },
  },
  formStyle:{
    container:{
      // boxShadow:'0 0 5px #6a6c6e', 
      boxShadow:'0 0 5px #6a6c6e61', 
      borderRadius:'12px',

    },
    box:{
      marginTop: 2,
      paddingTop:3,
      paddingBottom:3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
});

const SignUp = () => {
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      name:'',
      email: '',
      password: ''
    },
    validationSchema: signUpSchema,
    onSubmit: (values,{resetForm}) => {
      const response=userSignup(values);
      response.then(res=>{
      dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }))
    }).catch(err=>dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: err.message })));
      resetForm({values:''});
    }
  });


  return (
    <ThemeProvider theme={theme}>
    <Container component="div" maxWidth="xs" sx={theme.formStyle.container}>
      <CssBaseline />
      <Box sx={theme.formStyle.box}>
        <img src={Logo} className='logo' alt='logo' />
        <Typography component="h1" variant="h5" sx={{mt:3}}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="text"
            autoFocus
            sx={{background:'#fff'}}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Phone"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{background:'#fff'}}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            sx={{background:'#fff'}}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            id="passwordConfirmation"
            autoComplete="password"
            sx={{background:'#fff'}}
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          /> */}
          <Button
            type="submit"
            fullWidth
            size='large'
            color='success'
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {SIGNUP.CREATE}
          </Button>
        </Box>
      </Box>        
    </Container>
  </ThemeProvider>
  )
}

export default SignUp