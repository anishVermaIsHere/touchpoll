import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { URL_PATH } from '../constants/routeslinks';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../utils/constants/constants';
import { AboutPage, CreatePoll, Dashboard, DashboardCont, ErrorPage, HomePage, LoginPage, ManageCmp, ManagePoll, PollList, PollSection, Profile, Protected, RegisterPage, Result, UserPolls, UserProfile } from './LazyComponents';
import LoadingSpinner from '../../utils/widgets/LoadingSpinner';



export const { HOME, DASHBOARD, ALL_POLLS, MANAGE_POLL, CREATE_POLL, EDIT_POLL,
  POLL_SECTION, USER_POLL, RESULTS,ACCOUNT, PROFILE,PROFILE_MANAGE } = URL_PATH;

const AppRoutes = () => {
  const auth = useSelector(state => state.userSlice.auth);
  const { CLIENT } = CONSTANTS.ERROR;


  return (
    <Routes>
      <Route path='/' element={<Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense>} />
      <Route path={URL_PATH.ABOUT} element={<Suspense fallback={<LoadingSpinner />}><AboutPage /></Suspense>} />
      <Route path='/auth'>
        <Route index element='' />
        <Route path='signin' element={<Suspense fallback={<LoadingSpinner />}>{auth.token==null?<LoginPage />:<Navigate to={POLL_SECTION}/>}</Suspense>} />
        <Route path='register' element={<Suspense fallback={<LoadingSpinner />}>{auth.token==null?<RegisterPage />:<Navigate to="/"/>}</Suspense>} />
      </Route>

      <Route element={<Suspense fallback={<LoadingSpinner />}><Protected /></Suspense>}>
        <Route path='/admin' element={<Suspense fallback={<LoadingSpinner />}><Dashboard /> </Suspense>}>
          <Route path={MANAGE_POLL} element={<Suspense fallback={<LoadingSpinner />}><ManagePoll /></Suspense>}> 
            <Route path={CREATE_POLL} element={<Suspense fallback={<LoadingSpinner />}><CreatePoll /></Suspense>} />
            <Route path={ALL_POLLS} element={<Suspense fallback={<LoadingSpinner />}><PollList /></Suspense>} />
          </Route>
          
          <Route path={`${ACCOUNT}/:${auth.name}`} element={<Suspense fallback={<LoadingSpinner />}><UserProfile /></Suspense>}>
            <Route path={PROFILE} element={<Suspense fallback={<LoadingSpinner />}><Profile /></Suspense>} />
          </Route>
          <Route path={DASHBOARD} element={<Suspense fallback={<LoadingSpinner />}><DashboardCont /></Suspense>} />
          <Route path={RESULTS} element={<Suspense fallback={<LoadingSpinner />}><Result /></Suspense>} />
        </Route>
        <Route path={POLL_SECTION} element={<Suspense fallback={<LoadingSpinner />}><PollSection /></Suspense>} />
        <Route path={`admin/${MANAGE_POLL}/${EDIT_POLL}/:id`} element={<Suspense fallback={<LoadingSpinner />}><ManageCmp /></Suspense>} />
        <Route path={`${USER_POLL}/:id`} element={<Suspense fallback={<LoadingSpinner />}><UserPolls /></Suspense>} />
      </Route>

      <Route path='*' element={<Suspense fallback={<LoadingSpinner />}><ErrorPage errCode={CLIENT.CODE} errMessage={CLIENT.MSG} /></Suspense>} />
    </Routes>
  )
}

export default AppRoutes