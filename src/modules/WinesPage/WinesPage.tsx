import { useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { SortAndFilter } from '../../components/SortAndFilter';
import { useWines } from '../../store/WinesContext';
import styles from './WinesPage.module.scss';

export const WinesPage = () => {
  const { wines, fetchAllWines } = useWines();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllWines();
  }, []);

  if (!wines.length) {
    return (
      <div className={styles['wines-page']}>
        <div className={styles['wines-page__content']}>
          <h1 className={styles['wines-page__error']}>Not found wines</h1>
        </div>
      </div>
    )
  }

  return (
    <div className={styles['wines-page']}>
      <div className={styles['wines-page__content']}>
        <div className={styles['wines-page__header']}>
          <h5 className={styles['wines-page__title']}>all</h5>
          <SortAndFilter />
        </div>
        <div className={styles['wines-page__products']}>
          {wines.map(wine => (
            <div className={styles['wines-page__product']} key={wine.id}>
              <ProductCard wine={wine} />
            </div>
          ))}
        </div>
        <button className={styles['wines-page__button']}>SHOW MORE</button>
      </div>
    </div>
  );
};
