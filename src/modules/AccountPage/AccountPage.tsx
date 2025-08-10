import { useEffect } from 'react';
import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(true) {
    return (
      <div className={styles['account-page']}>
      <div className={styles['account-page__content']}>
<h1 className={styles['account-page__error']}>Not found saved wines</h1>
      </div>
    </div>
    )
  }

  return (
    <div className={styles['account-page']}>
      <div className={styles['account-page__content']}>
        <h2 className={styles['account-page__title']}>saved wines</h2>
        <div className={styles['account-page__products']}></div>
      </div>
    </div>
  );
};
