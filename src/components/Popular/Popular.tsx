import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useWines } from '../../store/WinesContext';
import { Wine, WineVariety } from '../../types/Wine';
import { ProductCard } from '../ProductCard';
import styles from './Popular.module.scss';

export const Popular: React.FC = ({ }) => {
  const { wines, fetchWinesByParams, fetchAllWines } = useWines();
  const [popularWines, setPopularWines] = useState<Wine[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const filter = Object.values(WineVariety);

  useEffect(() => {
    setPopularWines(wines.slice(0, 4))
  }, [wines]);

  const handleClickFilter = (filter: string) => {
    setActiveFilter(filter);
    filter === 'all' ?
      fetchAllWines()
      :
      fetchWinesByParams({ wineSearchDto: { variety: [filter.toUpperCase()] }, pageable: { page: 0, size: 10, sort: [] } })
  }

  return (
    <div className={styles.popular}>
      <h2 className={styles.popular__title}>Popular</h2>
      <div className={styles.popular__filters}>
        <ul className={styles.filters__list}>
          {[
            'all',
            ...filter
          ].map((filter, index) => (
            <li className={classNames(styles.filters__item, {
              [styles['filters__item--active']]: filter === activeFilter
            })} key={index} onClick={() => handleClickFilter(filter)}>
              {filter}
            </li>
          ))}
        </ul>
        <NavLink to={'wines'} className={styles.popular__button}>SHOP ALL WINES</NavLink>

      </div>
      <div className={styles['popular__product-cards']}>
        {popularWines.map(wine => (
          <ProductCard wine={wine} key={wine.id} short={true} />
        ))}
      </div>
      <NavLink to={'wines'} className={classNames(
        styles.popular__button,
        styles['popular__button--mobile'],
      )}>

        SHOP ALL WINES
      </NavLink>

    </div>
  );
};
