import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './SearchAndBasket.module.scss';

interface Props {
  onMenu?: () => void;
}

export const SearchAndBasket: React.FC<Props> = ({ onMenu }) => {
  return (
    <ul className={styles.buttons}>
      <li className={styles.button}>
        <NavLink to={'/'} onClick={onMenu}>
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--search'],
            )}
          ></div>
        </NavLink>
      </li>
      <li className={styles.button}>
        <NavLink to={'/cart'} onClick={onMenu}>
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
