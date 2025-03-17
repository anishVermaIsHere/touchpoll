import { lazy } from "react";

export const HomePage = lazy(()=>import("../../pages/HomePage"));
export const  AboutPage = lazy(()=>import('../../pages/AboutPage'));
export const  LoginPage = lazy(()=>import ('../../pages/LoginPage'));
export const  RegisterPage = lazy(()=>import('../../pages/RegisterPage'));
export const  UserProfile = lazy(()=>import ('../../features/user/components/profile/UserProfile'));
export const  Dashboard = lazy(()=>import ('../../features/admin/components/Dashboard'));
export const  DashboardCont = lazy(()=>import ('../../features/admin/components/DashboardCont'));
export const  CreatePoll = lazy(()=>import ('../../features/admin/components/CreatePoll'));
export const  ManagePoll = lazy(()=>import ('../../features/admin/components/ManagePoll'));
export const  PollList = lazy(()=>import ('../../features/admin/components/PollList'));
export const  ManageCmp = lazy(()=>import ('../../features/admin/ManageCmp'));
export const  PollSection = lazy(()=>import ('../../features/user/components/polls-surveys/PollSection'));
export const  Result = lazy(()=>import ('../../features/admin/components/Result'));
export const  Profile = lazy(()=>import ('../../features/user/components/profile/Profile'));
export const ErrorPage = lazy(()=>import('../../utils/widgets/Error'));
export const UserPolls = lazy(()=>import('../../features/user/components/polls-surveys/UserPolls'));
export const Protected = lazy(()=>import('../../features/user/components/Protected'));