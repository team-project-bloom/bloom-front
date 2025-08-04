import classNames from 'classnames';
import styles from './SortAndFilter.module.scss';

interface Props {}

export const SortAndFilter: React.FC<Props> = ({}) => {
  return (
    <div className={styles.buttons}>
      <button className={styles.button}>
        <div
          className={classNames(
            styles.button__img,
            styles['button__img--sort'],
          )}
        ></div>
        <p className={styles.button__text}>sort</p>
      </button>
      <button className={styles.button}>
        <div
          className={classNames(
            styles.button__img,
            styles['button__img--filter'],
          )}
        ></div>
        <p className={styles.button__text}>filter</p>
      </button>
    </div>
  );
};
