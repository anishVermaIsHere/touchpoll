import React from 'react'
import { Navigate, Outlet} from 'react-router-dom';
import { URL_PATH } from '../../../utils/routes/constants/routeslinks';


const Protected = ({localData}) => {
  const {SIGNIN}=URL_PATH;
  return localData?<Outlet />:<Navigate to={SIGNIN} />
}

export default Protected