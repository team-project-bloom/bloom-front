import { useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard';

import { useFavourite } from '../../hooks/useFavourite';
import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const { favourite, fetchFavourite } = useFavourite();

  useEffect(() => {
    fetchFavourite();
  }, [favourite, fetchFavourite]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['account-page']}>
      <div className={styles['account-page__content']}>
        {!favourite.length ? (
          <h1 className={styles['account-page__error']}>
            Not found saved wines
          </h1>
        ) : (
          <>
            <h2 className={styles['account-page__title']}>saved wines</h2>
            <div className={styles['account-page__products']}>
              {favourite.map(wine => (
                <div key={wine.id} className={styles['account-page__product']}>
                  <ProductCard wine={wine} short={false} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
