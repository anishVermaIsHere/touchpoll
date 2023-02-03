import axios from 'axios';
import { URL_PATH } from '../../routes/constants/routeslinks';

const {SIGNIN,SIGNUP,PROFILE,ACCOUNT,CHANGE_PWD}=URL_PATH;
axios.defaults.baseURL=process.env.REACT_APP_BACKENDURL;

export const tokenInit=()=>{
    let localData=localStorage.getItem('user-info');
    let authToken='';
    if(localData==null){}
    else{
        authToken=JSON.parse(localData).token;
    }
    return {'Authorization':authToken}
}


// signup user
export const userSignup= (data)=>{
   const res= axios({method:'POST',url:SIGNUP, data:data});
   return res;
}

// signin user
export const userSignin=(data)=>{
    const res= axios({method:'POST',url:SIGNIN, data:data});
    return res;
}

// change password 
export const changePassword=(data)=>{
    const res= axios({
        method:'PUT',
        url:`admin/${ACCOUNT}/${PROFILE}/${CHANGE_PWD}`,
        data:data
    });
    return res;
}
