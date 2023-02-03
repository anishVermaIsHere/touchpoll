import React, {useEffect} from 'react';
import './App.css';
import PollApp from './App/PollApp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { onAuthStateChanged, signOut } from "firebase/auth";  
import {auth} from './utils/services/firebase/auth/config';
import { handleAuthUser } from './utils/redux/slices/user/user-slice';
import { URL_PATH } from './utils/routes/constants/routeslinks'
import { handleSnackBar } from './utils/redux/slices/snackbar/snackbar-slice';


const theme=createTheme({
  typography:{
    fontFamily:[
    'Poppins',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(',')
  },
})

const App = ()=> {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatcher=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const {SIGNIN}=URL_PATH;
  
  // toggle menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // parse jsonwebtoken 
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const signOutUser=()=>{
   signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('user-info');
    dispatcher(handleAuthUser({
      name:null,
      token:null,
      email:null,
      message:null
    }));
    navigate(SIGNIN);
    }).catch((error) => {
      // An error happened.
      dispatcher(handleSnackBar({snackOpen:true, snackType:"error", snackMessage:error.message}))
    });
  } 


  // jwt verification
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      const decodedJwt = parseJwt(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        signOutUser();
        dispatcher(handleSnackBar({snackOpen:true, snackType:"info", snackMessage:"Session expired, Please login to continue"}))
      }
    }
  }, [location]);

  
  useEffect(()=>{
    let localData=localStorage.getItem('user-info');
    if(localData){
        dispatcher(handleAuthUser(JSON.parse(localData)));
    }
    else {
      // dispatcher(handleAuthUser(null));
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ...
        if(location.pathname=={SIGNIN}){
          navigate('*');
        }
      } else {
        // No user signed in 
      }
    },[localStorage]);
    
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <PollApp 
         handleDrawerToggle={handleDrawerToggle} 
         mobileOpen={mobileOpen} 
         signOut={signOutUser}
         />
      </ThemeProvider>
    </>
  );
}

export default App;
