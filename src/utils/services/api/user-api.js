import axiosInstance from "../interceptor";
import { URL_PATH } from "../../../config/constants/routeslinks";

const { SIGNIN, SIGNUP, PROFILE, ACCOUNT, CHANGE_PWD } = URL_PATH;

// signup user
export const userSignup = (data) => {
  const res = axiosInstance({ method: "POST", url: SIGNUP, data: data });
  return res;
};

// signin user
export const userSignin = (data) => {
  const res = axiosInstance({ method: "POST", url: SIGNIN, data: data });
  return res;
};

// change password
export const changePassword = (data) => {
  const res = axiosInstance({
    method: "PUT",
    url: `${ACCOUNT}/${PROFILE}/${CHANGE_PWD}`,
    data: data,
  });
  return res;
};
