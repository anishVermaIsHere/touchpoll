import axiosInstance from "../interceptor";
import { URL_PATH } from "../../../config/constants/routeslinks";

const { SUBMIT_POLL } = URL_PATH;

// fetch all polls from database
export const fetchPolls = () => {
  const response = axiosInstance({
    method: "GET",
    url: `/polls`,
  });
  return response;
};

// fetch single poll to edit
export const fetchOnePoll = async (data) => {
  const { id } = data;
  const response = await axiosInstance({
    method: "GET",
    url: `/polls/${id}`,
  });
  return response;
};

// post submitted polls
export const pollSubmit = (poll) => {
  const { pollid } = poll;
  const response = axiosInstance({
    method: "POST",
    url: `${SUBMIT_POLL}/${pollid}`,
    data: poll,
  });
  return response;
};

export const pollCreate = (formData) => {
  const response = axiosInstance({
    method: "POST",
    url: `polls`,
    data: formData,
  });
  return response;
};

export const pollEdit = (data) => {
  const { formData, id } = data;
  const response = axiosInstance({
    method: "PUT",
    url: `polls/${id}`,
    data: formData,
  });
  return response;
};

export const pollDelete = (id) => {
  const response = axiosInstance({
    method: "DELETE",
    url: `polls/${id}`,
  });
  return response;
};
