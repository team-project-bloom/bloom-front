import { Outlet } from 'react-router-dom';
import { getToken } from './api';
import './index.scss';

getToken().then(t => t);

export const App = () => <Outlet />;
