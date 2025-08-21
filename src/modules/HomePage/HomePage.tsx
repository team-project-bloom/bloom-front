import { useEffect } from 'react';
import { AboutUs } from '../../components/AboutUs';
import { Banner } from '../../components/Banner';
import { Popular } from '../../components/Popular';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner />
      <Popular />
      <AboutUs />
    </div>
  );
};
