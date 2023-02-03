import axios from "axios";
export function tokenInterceptor() {
    axios.defaults.baseURL = process.env.REACT_APP_BACKENDURL;
    const requestInterceptor = axios.interceptors.request.use(
        (request) => {
            let localData = localStorage.getItem('user-info');
            let authToken = '';
            if (localData == null) { }
            else {
                authToken = JSON.parse(localData).token;
                request.headers["Authorization"]=authToken;
            }
            return request;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    const responseInterceptor = axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    // setTimeout(() => {
    //     axios.interceptors.request.eject(requestInterceptor);
    //     console.log("Request Interceptor Eject .....");
    // }, 10000);
}
