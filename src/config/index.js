
const AppConfig = {
    defaults: {
        loginEmail: process.env.REACT_APP_DEFAULT_EMAIL,
        loginPwd: process.env.REACT_APP_DEFAULT_PASSWORD
    },
    baseUrl: process.env.REACT_APP_BASEURL,
    appName: process.env.REACT_APP_NAME,
    appDomain: process.env.REACT_APP_DOMAIN
};

export default AppConfig;