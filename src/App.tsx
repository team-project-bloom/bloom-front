import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getToken } from './api';
import './index.scss';
import { initGA, logPageView } from './utils/analytics';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  getToken().then(t => t);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);


  return (<Outlet />);
};
