import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { theme } from './SignUp';
import { signInSchema } from '../../../utils/validation/validation-schema';
import { CONSTANTS } from '../../../utils/constants/constants';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../../assets/images/hand-click-1299.svg';
import { ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FaFacebookF from '@mui/icons-material/Facebook';
import { NavLink, useNavigate } from 'react-router-dom';
import { URL_PATH } from '../../../config/constants/routeslinks';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { signIn } from '../../../utils/redux/slices/user/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { handleSnackBar } from '../../../utils/redux/slices/snackbar/snackbar-slice';

const { TITLE, GOOGLE,HOME, FB, SIGNIN } = CONSTANTS.SIGNIN;
const { POLL_SECTION, SIGNUP } = URL_PATH;


export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(state => state.userSlice.auth.message);
  const auth = useSelector(state => state.userSlice.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: (values, { resetForm }) => {
      const res = dispatch(signIn(values));
      
      resetForm({ values: '' });
    }
  });


  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem('user-info', auth.currentUser);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        navigate(POLL_SECTION);
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem('user-info', JSON.stringify({
          name: user.displayName,
          email: user.email,
          token: user.accessToken
        }));
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  useEffect(() => {
    if(localStorage.getItem('user-info')){
      navigate(POLL_SECTION);
    }
    else {
      dispatch(handleSnackBar({ snackOpen: false, snackType: "success", snackMessage: null }));
    }
  },[auth])



  return (
    <ThemeProvider theme={theme}>
      <Container component="div" maxWidth="xs" sx={theme.formStyle.container}>
        <CssBaseline />
        <Box sx={theme.formStyle.box}>
          <img src={Logo} className='logo' alt='logo' />
          <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
            {TITLE}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              size='large'
              color='secondary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={googleSignIn}
            >
              <GoogleIcon sx={{ mr: 2 }} />
              {GOOGLE}
            </Button>

            <Button
              type="submit"
              fullWidth
              size='large'
              color='secondary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={facebookLogin}
            >
              <FaFacebookF sx={{ mr: 2 }} />
              {FB}
            </Button>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email or Phone"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoFocus
              sx={{ background: '#fff' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              sx={{ background: '#fff' }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              size='large'
              color='primary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {SIGNIN}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={NavLink} to={SIGNUP} variant="body2">
                  {"Don't have an account? Create"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}