import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export const URL_PATH={
    HOME:'/',
    SIGNIN:'/user/signin',
    SIGNUP:'/user/register',
    SIGNOUT:'/user/signout',
    ABOUT:'/about',
    API_BASE_PATH:'/api/v1/poll',
    GET_SAVED_POLL:'result',
    SUBMIT_POLL:'/submit/poll',
    ACCOUNT:'account',
    PROFILE:'profile',
    CHANGE_PWD:'change-password',
    PROFILE_MANAGE:'manage',
    DASHBOARD:'dashboard',
    RESULTS:'poll-results',
    MANAGE_POLL:'manage',
    CREATE_POLL:'create-poll',
    DELETE_POLL:'delete',
    EDIT_POLL:'edit',
    ALL_POLLS:'polls',
    POLL_SECTION:'/user/polls',
    USER_POLL:'/user/poll'
}

export const MAIN_MENU=[
    {
        type:1,
        title:'Polls',
        link:URL_PATH.POLL_SECTION,
        icon:BarChartIcon
    },
    {
        type:1,
        title:'About us',
        link:URL_PATH.ABOUT,
        icon:GroupsIcon
    },
    {
        type:1,
        title:'Dashboard',
        link:`/admin/${URL_PATH.DASHBOARD}`,
        icon:DashboardIcon
    }
]

export const SIDEBAR_MENU=[
    {
        type:1,
        title:'Polls',
        link:URL_PATH.POLL_SECTION,
        icon:BarChartIcon
    },
    {
        type:1,
        title:'About us',
        link:URL_PATH.ABOUT,
        icon:GroupsIcon
    },
    {
        type:1,
        title:'Dashboard',
        link:`/admin/${URL_PATH.DASHBOARD}`,
        icon:DashboardIcon
    },
    {
        type:2,
        title:'Manage Polls',
        link:`/admin/${URL_PATH.MANAGE_POLL}/${URL_PATH.CREATE_POLL}`,
        icon:AddCircleIcon
    },
    {
        type:2,
        title:'Results',
        link:`/admin/${URL_PATH.RESULTS}`,
        icon:BarChartIcon
    }

]

