import { AboutUs } from '../../components/AboutUs';
import { Banner } from '../../components/Banner';
import { Popular } from '../../components/Popular';
import { useWines } from '../../store/WinesContext';

export const HomePage = () => {
  const { wines } = useWines();

  return (
    <div>
      <Banner />
      <Popular wines={wines} />
      <AboutUs />
    </div>
  );
};
