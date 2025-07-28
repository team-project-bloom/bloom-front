import { Link } from 'react-router-dom';
import { Nav } from '../Nav';
import { SearchAndBasket } from '../SearchAndBasket';
import styles from './Header.module.scss';

interface Props {
  onMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ onMenu }) => {
  const toggleMenu = () => {
    onMenu(prev => !prev);
  };

  return (
    <div className={styles.header}>
      <Link to="#" className={styles.header__menu} onClick={toggleMenu}></Link>
      <Link to="home" className={styles.header__link}>
        <p className={styles.header__logo}>bloom</p>
      </Link>
      <Nav />
      <SearchAndBasket />
    </div>
  );
};
