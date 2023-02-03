import React from 'react'
import { Alert, Snackbar} from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { handleSnackBar } from '../redux/slices/snackbar/snackbar-slice';

const AlertBox = () => {
  const snackOpen=useSelector(state=>state.snackBarSlice.open);
  const snackType=useSelector(state=>state.snackBarSlice.type);
  const snackMessage=useSelector(state=>state.snackBarSlice.message);
  const dispatch=useDispatch();

  const snackBarClose = () => {
    dispatch(handleSnackBar({snackOpen:false, snackType:"", snackMessage:""}));
  };
  return (
    <>
      <Snackbar
        open={snackOpen}
        anchorOrigin={{vertical:'top', horizontal:'center'}}
        autoHideDuration={5000}
        onClose={snackBarClose}
      >
        <Alert
          onClose={snackBarClose}
          severity={snackType}
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AlertBox