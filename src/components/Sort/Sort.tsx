import classNames from 'classnames';
import React, { useState } from 'react';
import { useWines } from '../../store/WinesContext';
import { SortOptions } from '../../types/SortOptions';
import styles from './Sort.module.scss';

interface Props {}

export const Sort: React.FC<Props> = () => {
  const { fetchWinesByParams } = useWines();
  const [activeSort, setActiveSort] = useState('');
  const sortOptions = Object.values(SortOptions);

  const handleClickSortOption = (value: string) => {
    if (activeSort === value) {
      setActiveSort('');
    }

    if (value === SortOptions.LOW) {
      setActiveSort(value);
      fetchWinesByParams({
        wineSearchDto: {},
        pageable: { page: 0, size: 10, sort: ['price', 'asc'] },
      });
    } else if (value === SortOptions.HIGHT) {
      setActiveSort(value);
      fetchWinesByParams({
        wineSearchDto: {},
        pageable: { page: 0, size: 10, sort: ['price', 'desc'] },
      });
    }
  };

  return (
    <div className={styles['sort-modal']}>
      <ul className={styles['sort-modal__list']}>
        {sortOptions.map((sortOption, i) => (
          <li
            key={i}
            className={styles['sort-modal__item']}
            onClick={() => handleClickSortOption(sortOption)}
          >
            <div
              className={classNames(styles['sort-modal__mark'], {
                [styles['sort-modal__mark--active']]: activeSort === sortOption,
              })}
            ></div>
            <p className={styles['sort-modal__option']}>{sortOption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
