import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  return (
    <div className={styles['account-page']}>
      <div className={styles['account-page__content']}>
        <h2 className={styles['account-page__title']}>saved wines</h2>
        <div className={styles['account-page__products']}></div>
      </div>
    </div>
  );
};
