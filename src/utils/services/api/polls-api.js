import axios from 'axios';
import {URL_PATH} from '../../routes/constants/routeslinks';

const {ALL_POLLS, MANAGE_POLL, CREATE_POLL, EDIT_POLL,DELETE_POLL, SUBMIT_POLL, USER_POLL}=URL_PATH;

axios.defaults.baseURL=process.env.REACT_APP_BASEURL;

// fetch all polls from database
export const fetchPolls=()=>{
    const response=axios({ 
        method:'GET',
        url:`admin/${MANAGE_POLL}/${ALL_POLLS}`
    });
    return response;
}

// fetch single poll to edit
export const fetchOnePoll=async(data)=>{
    const {id}=data;
    const response=await axios({ 
        method:'GET',
        url:`${USER_POLL}/${id}`
    });
    return response;
}

// post submitted polls
export const pollSubmit=(poll)=>{
    const {pollid}=poll;
    const response= axios({
        method:'POST', 
        url:`${SUBMIT_POLL}/${pollid}`, 
        data:poll
    });
    return response;
}

export const pollCreate=(formData)=>{
    const response=axios({
        method:'POST', 
        url:`admin/${MANAGE_POLL}/${CREATE_POLL}`, 
        data:formData
    });
    return response;
}

export const pollEdit=(data)=>{
    const {formData,id}=data;
    const response=axios({
        method:'PUT', 
        url:`admin/${MANAGE_POLL}/${EDIT_POLL}/${id}`, 
        data:formData
    });
    return response;
}

export const pollDelete=(id)=>{
    const response=axios({
        method:'DELETE', 
        url:`admin/${MANAGE_POLL}/${DELETE_POLL}/${id}`, 
    });
    return response;
}