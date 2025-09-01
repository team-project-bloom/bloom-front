import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CartItem } from '../../components/CartItem';
import { useCart } from '../../store/CartContext';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart, removeFromCart, loading } = useCart();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sum = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 1),
      0,
    );

    setSubtotal(sum);
  }, [cart]);

  if (!loading && !cart.length) {
    return (
      <div className={styles['cart-page']}>
        <div className={styles['cart-page__content--error']}>
          <h1 className={styles['cart-page__error']}>Cart is empty</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['cart-page']}>
      <h2
        className={styles['cart-page__title']}
      >{`MY CART(${cart.length})`}</h2>
      <div className={styles['cart-page__content']}>
        <div className={styles['cart-page__fill']}>
          <div className={styles['cart-page__products']}>
            {cart.sort((a, b) => a.title.localeCompare(b.title)).map(wine => (
              <div className={styles['cart-page__product']} key={wine.id}>
                <CartItem
                  wine={wine}
                  onRemove={() => removeFromCart(wine.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles['cart-page__summary']}>
          <h2
            className={classNames(
              styles['cart-page__title'],
              styles['cart-page__title--summary'],
            )}
          >
            SUMMARY
          </h2>
          <div className={styles['cart-page__term']}>
            <p className={styles['cart-page__text']}>SUBTOTAL</p>
            <p className={styles['cart-page__text']}>{`$${subtotal}`}</p>
          </div>
          <div className={styles['cart-page__term']}>
            <p className={styles['cart-page__text']}>SHIPPING</p>
            <p className={styles['cart-page__text']}>Free</p>
          </div>
          <div
            className={classNames(
              styles['cart-page__term'],
              styles['cart-page__term--total'],
            )}
          >
            <p
              className={classNames(
                styles['cart-page__text'],
                styles['cart-page__text--total'],
              )}
            >
              TOTAL
            </p>
            <p
              className={classNames(
                styles['cart-page__text'],
                styles['cart-page__sum--total'],
              )}
            >{`$${subtotal}`}</p>
          </div>
          <button className={styles['cart-page__button']}>checkout</button>
        </div>
      </div>
    </div>
  );
};
