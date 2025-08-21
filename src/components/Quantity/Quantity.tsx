import classNames from 'classnames';
import React from 'react';
import styles from './Quantity.module.scss';

interface Props {
  count: number;
  onCount: (value: number) => void;
}

export const Quantity: React.FC<Props> = ({ count, onCount }) => {
  const handleIncrease = () => onCount(count + 1);

  const handleDecrease = () => {
    if (count > 1) {

        onCount(count - 1);

    }
  };

  return (
    <div className={styles.quantity}>
      <button
        className={classNames(
          styles.quantity__icon,
          styles['quantity__icon--minus'],
        )}
        onClick={handleDecrease}
      ></button>
      <p className={styles.quantity__count}>{count}</p>
      <button
        className={classNames(
          styles.quantity__icon,
          styles['quantity__icon--plus'],
        )}
        onClick={handleIncrease}
      ></button>
    </div>
  );
};
