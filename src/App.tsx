
import { Outlet } from 'react-router-dom';
import { getToken } from './api';
import './index.scss';

getToken();

export const App = () =>  <Outlet />;
