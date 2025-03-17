import axios from "axios";
import AppConfig from "../../config";

const axiosInstance = axios.create({
    baseURL: AppConfig.baseUrl,
});

export function tokenInterceptor() {
    const requestInterceptor = axiosInstance.interceptors.request.use(
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
    const responseInterceptor = axiosInstance.interceptors.response.use(
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

export default axiosInstance;