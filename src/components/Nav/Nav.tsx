import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';

interface Props {
  isMenu?: boolean;
  onLinkClick?: () => void;
}

export const Nav: React.FC<Props> = ({ isMenu, onLinkClick }) => {
  const location = useLocation().pathname.split('/').pop();
  const isWine = useLocation()
    .pathname.split('/')
    .some(i => i === 'wine');

  return (
    <div
      className={classNames(styles.nav, {
        [styles['nav--menu']]: isMenu,
      })}
    >
      <ul
        className={classNames(styles.nav__list, {
          [styles['nav__list--menu']]: isMenu,
        })}
      >
        {['home', 'wines', 'account'].map((item, index) => (
          <li className={styles.nav__item} key={index}>
            <NavLink
              to={item}
              onClick={onLinkClick}
              className={({ isActive }) =>
                classNames(styles.nav__link, {
                  [styles[`nav__link--active`]]:
                    isActive ||
                    (!location && item === 'home') ||
                    (isWine && item === 'wines'),
                  [styles[`nav__link--menu`]]: isMenu,
                })
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
