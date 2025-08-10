import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Banner.module.scss';

interface Props { }

export const Banner: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.banner}>
      <div
        className={classNames(
          styles.banner__img,
          styles['banner__img--bottle-left'],
        )}
      ></div>
      <div
        className={classNames(
          styles.banner__img,
          styles['banner__img--bottle-right'],
        )}
      ></div>
      <div
        className={classNames(
          styles.banner__img,
          styles['banner__img--bottle-bottom'],
        )}
      ></div>
      <div className={styles.banner__wrapper}>
        <h1 className={styles.banner__title}>
          WELCOME TO EXPLORE{' '}
          <span className={styles['line-break__mobile']}></span>A WIDE{' '}
          <span className={styles['line-break__desktop']}></span>
          SELECTION <span className={styles['line-break__mobile']}></span>
          OF WINES FROM <span className={styles['line-break__mobile']}></span>
          AROUND <span className={styles['line-break__desktop']}></span>
          THE WORLD.
        </h1>
        <NavLink to={'wines'} className={styles.banner__button}> CHOOSE YOUR TASTE</NavLink>
      </div>
    </div>
  );
};
