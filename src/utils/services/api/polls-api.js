import axiosInstance from '../interceptor';
import {URL_PATH} from '../../../config/constants/routeslinks';

const {ALL_POLLS, MANAGE_POLL, CREATE_POLL, EDIT_POLL,DELETE_POLL, SUBMIT_POLL, USER_POLL}=URL_PATH;

// fetch all polls from database
export const fetchPolls=()=>{
    const response=axiosInstance({ 
        method:'GET',
        url:`admin/${MANAGE_POLL}/${ALL_POLLS}`
    });
    return response;
}

// fetch single poll to edit
export const fetchOnePoll=async(data)=>{
    const {id}=data;
    const response=await axiosInstance({ 
        method:'GET',
        url:`${USER_POLL}/${id}`
    });
    return response;
}

// post submitted polls
export const pollSubmit=(poll)=>{
    const {pollid}=poll;
    const response= axiosInstance({
        method:'POST', 
        url:`${SUBMIT_POLL}/${pollid}`, 
        data:poll
    });
    return response;
}

export const pollCreate=(formData)=>{
    const response=axiosInstance({
        method:'POST', 
        url:`admin/${MANAGE_POLL}/${CREATE_POLL}`, 
        data:formData
    });
    return response;
}

export const pollEdit=(data)=>{
    const {formData,id}=data;
    const response=axiosInstance({
        method:'PUT', 
        url:`admin/${MANAGE_POLL}/${EDIT_POLL}/${id}`, 
        data:formData
    });
    return response;
}

export const pollDelete=(id)=>{
    const response=axiosInstance({
        method:'DELETE', 
        url:`admin/${MANAGE_POLL}/${DELETE_POLL}/${id}`, 
    });
    return response;
}