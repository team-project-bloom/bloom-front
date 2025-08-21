import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useWines } from '../../store/WinesContext';
import { Wine, WineVariety } from '../../types/Wine';
import { ProductCard } from '../ProductCard';
import styles from './Popular.module.scss';

export const Popular: React.FC = ({}) => {
  const { wines, fetchWinesByParams, fetchAllWines } = useWines();
  const [popularWines, setPopularWines] = useState<Wine[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const filter = Object.values(WineVariety);

  useEffect(() => {
    fetchAllWines();
  }, [fetchAllWines]);

  const handleClickFilter = (f: string) => {
    setActiveFilter(f);
    const prev = localStorage.getItem('filter');

    if (f === 'all') {
      fetchAllWines();
    } else {
      fetchWinesByParams({
        wineSearchDto: { variety: [f.toUpperCase()] },
        pageable: { page: 0, size: 10, sort: [] },
      });
      const prevObj = prev ? JSON.parse(prev) : {};
      const updated = JSON.stringify({
        ...prevObj,
        variety: [f.toUpperCase()],
      });

      localStorage.setItem('filter', updated);
    }
  };

  useEffect(() => {
    setPopularWines(wines.slice(0, 4));
  }, [wines]);

  return (
    <div className={styles.popular}>
      <h2 className={styles.popular__title}>Popular</h2>
      <div className={styles.popular__filters}>
        <ul className={styles.filters__list}>
          {['all', ...filter].map((f, index) => (
            <li
              className={classNames(styles.filters__item, {
                [styles['filters__item--active']]: f === activeFilter,
              })}
              key={index}
              onClick={() => handleClickFilter(f)}
            >
              {f}
            </li>
          ))}
        </ul>
        <NavLink to={'wines'} className={styles.popular__button}>
          SHOP ALL WINES
        </NavLink>
      </div>
      <div className={styles['popular__product-cards']}>
        {popularWines.map(wine => (
          <ProductCard wine={wine} key={wine.id} short={true} />
        ))}
      </div>
      <NavLink
        to={'wines'}
        className={classNames(
          styles.popular__button,
          styles['popular__button--mobile'],
        )}
      >
        SHOP ALL WINES
      </NavLink>
    </div>
  );
};
