import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { Wine, WineCart } from '../../types/Wine';
import styles from './Quantity.module.scss';

interface Props {
  wine: WineCart | Wine;
  onCount?: React.Dispatch<React.SetStateAction<number>>;
}

export const Quantity: React.FC<Props> = ({ wine, onCount }) => {
  const { updateQuantity } = useCart();
  const [count, setCount] = useState(wine.quantity ?? 1);

  useEffect(() => {
    setCount(wine.quantity ?? 1);
  }, [wine.quantity]);

  const handleIncrease = () => {
    const newCount = count + 1;

    setCount(newCount);
    updateQuantity(wine.id, newCount);

    if (onCount) {
      onCount(newCount);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;

      setCount(newCount);
      updateQuantity(wine.id, newCount);

      if (onCount) {
        onCount(newCount);
      }
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
