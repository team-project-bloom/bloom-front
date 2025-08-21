import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { SearchAndBasket } from '../SearchAndBasket';
import styles from './Header.module.scss';

interface Props {
  isMenu: boolean;
  onMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isSearch: boolean;
  onSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({
  isMenu,
  onMenu,
  isSearch,
  onSearch,
}) => {
  const toggleMenu = () => {
    onMenu(prev => !prev);
  };

  const toggleSearch = () => {
    onSearch(prev => !prev);
  };

  return (
    <div className={styles.header}>
      {!isSearch ? (
        <>
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
          <SearchAndBasket
            onMenu={() => onMenu(false)}
            onSearch={toggleSearch}
          />
        </>
      ) : (
        <Search onSearch={() => onSearch(false)} />
      )}
    </div>
  );
};
