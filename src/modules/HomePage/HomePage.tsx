import { AboutUs } from '../../components/AboutUs';
import { Banner } from '../../components/Banner';
import { Popular } from '../../components/Popular';
import { useWines } from '../../store/WinesContext';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { wines } = useWines();

  return (
    <div className={styles['home-page']}>
      <Banner />
      <Popular wines={wines} />
      <AboutUs />
    </div>
  );
};
