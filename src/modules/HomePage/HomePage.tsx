import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AboutUs } from '../../components/AboutUs';
import { Banner } from '../../components/Banner';
import { Popular } from '../../components/Popular';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Helmet>
        <title>Bloom</title>
        <meta name="description" content="home page" />
      </Helmet>
    <div>
      <Banner />
      <Popular />
      <AboutUs />
    </div>
    </>
  );
};
