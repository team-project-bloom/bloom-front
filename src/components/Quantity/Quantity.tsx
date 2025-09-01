import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../store/CartContext';
import styles from './Quantity.module.scss';

interface Props {
  wineId: number,
  initialQuantity?: boolean,
  onInitialQuantity?: (number: number) => void
}

export const Quantity: React.FC<Props> = ({ wineId, initialQuantity, onInitialQuantity }) => {
  const { cart, updateQuantity } = useCart();
  const wine = cart.find(w => w.wineId === wineId);
  const { id = wineId, quantity } = wine ?? {};
  const [count, setCount] = useState(quantity ?? 1);

  useEffect(() => {
    initialQuantity && setCount(1)
  }, [initialQuantity])

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    onInitialQuantity?.(newCount)

    if (wine) {
      updateQuantity(id, newCount)
    }
  };

  const handleDecrease = () => {
    const newCount = count - 1;
    if (newCount) {
      setCount(newCount);

      onInitialQuantity?.(newCount)


      if (wine) {
        updateQuantity(id, newCount)
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
