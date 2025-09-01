import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { SortAndFilter } from '../../components/SortAndFilter';
import { useWines } from '../../store/WinesContext';
import styles from './WinesPage.module.scss';

export const WinesPage = () => {
  const { wines, fetchAllWines } = useWines();
  const filter = localStorage.getItem('filter');
  const [filterKeys, setFilterKeys] = useState<string[]>(['all']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (filter && wines.length < 10) {
      const newFilterKeys = Array.from(new Set(Object.keys(JSON.parse(filter)).map(f => f.replace(/From|To/g, ''))));

      setFilterKeys(newFilterKeys)
    } else {
      setFilterKeys(['all'])
    }
  }, [filter, wines.length])

  const handleAllWines = () => {
    window.scrollTo(0, 0);
    localStorage.setItem('filter', [])
    fetchAllWines();
  };

  return (
    <div className={styles['wines-page']}>
      <div className={styles['wines-page__content']}>
        <div className={styles['wines-page__header']}>
          <ul className={styles['wines-page__filter-keys']}>
            {filterKeys.map(filter => (
              <li className={styles['wines-page__filter-key']}>{filter}</li>
            ))}
          </ul>
          <SortAndFilter />
        </div>
        <div className={styles['wines-page__products']}>
          {wines.length > 0 ? (
            wines.map(wine => (
              <div className={styles['wines-page__product']} key={wine.id}>
                <ProductCard wine={wine} />
              </div>
            ))
          ) : (
            <h1 className={styles['wines-page__error']}>Not found wines</h1>
          )}
        </div>
        {wines.length !== 10 && (
          <button
            className={styles['wines-page__button']}
            onClick={handleAllWines}
          >
            SHOW All WINES
          </button>
        )}
      </div>
    </div>
  );
};
