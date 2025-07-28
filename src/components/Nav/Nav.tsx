import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';

interface Props {}

export const Nav: React.FC<Props> = ({}) => {
  const location = useLocation().pathname.split('/').pop();

  return (
    <div className={styles.nav}>
      <ul className={styles.nav__list}>
        {['home', 'wines', 'account'].map((item, index) => (
          <li className={styles.nav__item} key={index}>
            <NavLink
              to={item}
              className={({ isActive }) =>
                classNames(styles.nav__link, {
                  [styles[`nav__link--active`]]:
                    isActive || (!location && item === 'home'),
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
