import React from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {AiFillCaretDown} from 'react-icons/ai';
import { CONSTANTS } from '../../../../utils/constants/constants';
import { PROFILE } from '../../../../config/routes/AppRoutes';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function UserAccMenu(props) {
  const {SIGNOUT,ACCOUNT}=CONSTANTS.USER_MENU;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth=useSelector(state=>state.userSlice.auth);

  return (
    <div>
      <Button
        id="basic-button"
        variant="contained"
        color="success"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={props.style}
      >
       {props.username}
       <AiFillCaretDown style={{verticalAlign:'middle', marginLeft:'5px'}} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{fontSize:'0.9rem'}} component={NavLink} to={`admin/account/${auth.name}/${PROFILE}`} onClick={handleClose}>
          {ACCOUNT}
        </MenuItem>
        <MenuItem sx={{fontSize:'0.9rem'}} onClick={props.signOut}>{SIGNOUT}</MenuItem>
      </Menu>
    </div>
  );
}
