import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Nav } from '../Nav';
import { SearchAndBasket } from '../SearchAndBasket';
import styles from './Header.module.scss';

interface Props {
  isMenu: boolean;
  onMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ isMenu, onMenu }) => {
  const toggleMenu = () => {
    onMenu(prev => !prev);
  };

  return (
    <div className={styles.header}>
      <Link
        to="#"
        className={classNames(styles.header__menu, {
          [styles['header__menu--open']]: isMenu,
        })}
        onClick={toggleMenu}
      ></Link>
      <Link to="home" className={styles.header__link}>
        <p className={styles.header__logo}>bloom</p>
      </Link>
      <Nav />
      <SearchAndBasket onMenu={() => onMenu(false)} />
    </div>
  );
};
