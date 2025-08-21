import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Filter } from '../Filter';
import { Sort } from '../Sort/Sort';

import styles from './SortAndFilter.module.scss';

interface Props {}

export const SortAndFilter: React.FC<Props> = ({}) => {
  const [isOpen, setIsOpen] = useState('');
  const isMobile = window.matchMedia('(max-width: 1439px)').matches;

  useEffect(() => {
    if (isOpen === 'filter' && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, isMobile]);

  return (
    <div className={styles.buttons}>
      <div
        className={classNames(
          styles.buttons__button,
          styles['buttons__button--sort'],
        )}
      >
        <button
          className={classNames(styles.button, {
            [styles['button--is-open-sort']]: isOpen === 'sort',
          })}
          onClick={() => setIsOpen(prev => (prev === 'sort' ? '' : 'sort'))}
        >
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--sort'],
            )}
          ></div>
          <p className={styles.button__text}>sort</p>
        </button>
        {isOpen === 'sort' && <Sort />}
      </div>
      <div className={styles.buttons__button}>
        <button
          className={classNames(styles.button, {
            [styles['button--is-open-filter']]: isOpen === 'filter',
          })}
          onClick={() => setIsOpen(prev => (prev === 'filter' ? '' : 'filter'))}
        >
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--filter'],
            )}
          ></div>
          <p className={styles.button__text}>filter</p>
        </button>
        {isOpen === 'filter' && <Filter onClose={() => setIsOpen('')} />}
      </div>
    </div>
  );
};
