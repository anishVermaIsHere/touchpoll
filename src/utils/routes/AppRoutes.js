import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../components/Home';
import About from '../../components/About';
import SignIn from '../../features/user/components/SignIn';
import SignUp from '../../features/user/components/SignUp';
import { URL_PATH } from './constants/routeslinks';
import UserPolls from '../../features/user/components/polls-surveys/UserPolls';
import Protected from '../../features/user/components/Protected';
import Error from '../widgets/Error';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../constants/constants';
import UserProfile from '../../features/user/components/profile/UserProfile';
import Dashboard from '../../features/admin/components/Dashboard';
import DashboardCont from '../../features/admin/components/PollDashboard/DashboardCont';
import CreatePoll from '../../features/admin/components/CreatePoll';
import ManagePoll from '../../features/admin/components/ManagePoll';
import PollList from '../../features/admin/components/PollList';
import ManageCmp from '../../features/admin/ManageCmp';
import PollSection from '../../features/user/components/polls-surveys/PollSection';
import Result from '../../features/admin/components/Result';
import Profile from '../../features/user/components/profile/Profile';

export const { HOME, DASHBOARD, ALL_POLLS, MANAGE_POLL, CREATE_POLL, EDIT_POLL,
  POLL_SECTION, USER_POLL, RESULTS,ACCOUNT, PROFILE,PROFILE_MANAGE } = URL_PATH;

const AppRoutes = () => {
  const auth = useSelector(state => state.userSlice.auth);
  const localData=localStorage.getItem('user-info');
  const { CLIENT } = CONSTANTS.ERROR;


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path={URL_PATH.ABOUT} element={<About />} />
      <Route path='/user'>
        <Route index element='' />
        <Route path='signin' element={auth.token==null?<SignIn />:<Navigate to={POLL_SECTION}/>} />
        <Route path='register' element={auth.token==null?<SignUp />:<Navigate to="/"/>} />
      </Route>

      <Route element={<Protected localData={localData} />}>
        <Route path={POLL_SECTION} element={<PollSection />} />
        <Route path='/admin' element={<Dashboard />}>
          <Route path={MANAGE_POLL} element={<ManagePoll />}>
            <Route path={CREATE_POLL} element={<CreatePoll />} />
            <Route path={ALL_POLLS} element={<PollList />} />
          </Route>
            <Route path={`${ACCOUNT}/:${auth.name}`} element={<UserProfile />}>
              <Route path={PROFILE} element={<Profile />} />
            </Route>
          <Route path={DASHBOARD} element={<DashboardCont />} />
          <Route path={RESULTS} element={<Result />} />
        </Route>

        <Route path={`admin/${MANAGE_POLL}/${EDIT_POLL}/:id`} element={<ManageCmp />} />
        <Route path={`${USER_POLL}/:id`} element={<UserPolls />} />
      </Route>

      <Route path='*' element={<Error errCode={CLIENT.CODE} errMessage={CLIENT.MSG} />} />


    </Routes>
  )
}

export default AppRoutes