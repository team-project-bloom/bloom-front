import classNames from 'classnames';
import { useState } from 'react';
import { useWines } from '../../store/WinesContext';
import { FilterOptions } from '../../types/FilterOptions';
import { SortOptions } from '../../types/SortOptions';

import styles from './SortAndFilter.module.scss';

interface Props { }

export const SortAndFilter: React.FC<Props> = ({ }) => {
  const {wines, fetchWinesByParams} = useWines();
  const [isOpen, setIsOpen] = useState('');
  const [activeSort, setActiveSort] = useState('');
  const sortOptions = Object.values(SortOptions);
  // const FilterOptions:FilterOptions = {
  //   price: [0],
  //   alcohol: Array.from(new Set(wines.map(w => w.alcohol))),
  // }

  // console.log(FilterOptions);

  const handleClickSortOption = (value: string) => {
    if (activeSort === value) {
      setActiveSort('');
    }

    if (value === SortOptions.LOW) {
      setActiveSort(value);
      fetchWinesByParams({ wineSearchDto: { }, pageable: { page: 0, size: 10, sort: ['price', 'asc'] } })
    } else if ((value === SortOptions.HIGHT)) {
      setActiveSort(value);
      fetchWinesByParams({ wineSearchDto: { }, pageable: { page: 0, size: 10, sort: ['price', 'desc'] } })
    }
  }

  return (
    <div className={styles.buttons}>
      <div className={styles.buttons__button}>
        <button className={classNames(styles.button, {
          [styles['button--is-open-sort']]: isOpen === 'sort'
        })} onClick={() => setIsOpen(prev => prev === 'sort' ? '' : 'sort')}>
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--sort'],
            )}
          ></div>
          <p className={styles.button__text}>sort</p>
        </button>
        {isOpen === 'sort' && <div className={styles['sort-modal']}>
          <ul className={styles['sort-modal__list']}>
            {sortOptions.map((sortOption, i) =>  (
                <li key={i} className={styles['sort-modal__item']} onClick={() => handleClickSortOption(sortOption)}>
                  <div className={classNames(styles['sort-modal__mark'], {
                    [styles['sort-modal__mark--active']]: activeSort === sortOption
                  })}></div>
                  <p className={styles['sort-modal__option']}>{sortOption}</p>
                </li>
              )
            )}
          </ul>
        </div>}
      </div>
      <div className={styles.buttons__button}>
        <button className={classNames(styles.button, {
          [styles['button--is-open-filter']]: isOpen === 'filter'
        })} onClick={() => setIsOpen(prev => prev === 'filter' ? '' : 'filter')}>
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--filter'],
            )}
          ></div>
          <p className={styles.button__text}>filter</p>
        </button>
        {isOpen === 'filter' &&
          <div className={styles['filter-modal']}>
            <h3 className={styles['filter-modal__title']}>Filters</h3>
            <ul className={styles['filter-modal__list']}>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};
