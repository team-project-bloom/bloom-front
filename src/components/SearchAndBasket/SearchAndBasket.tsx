import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './SearchAndBasket.module.scss';

interface Props {}

export const SearchAndBasket: React.FC<Props> = ({}) => {
  return (
    <ul className={styles.buttons}>
      <li className={styles.button}>
        <NavLink to={'/'}>
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--search'],
            )}
          ></div>
        </NavLink>
      </li>
      <li className={styles.button}>
        <NavLink to={'/'}>
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--basket'],
            )}
          ></div>
        </NavLink>
      </li>
    </ul>
  );
};
