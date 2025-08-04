import classNames from 'classnames';
import { useWines } from '../../store/WinesContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { wines } = useWines();

  return (
    <div className={styles['cart-page']}>
      <h2 className={styles['cart-page__title']}>{`MY CART(${1})`}</h2>
      <div className={styles['cart-page__content']}>
        <div className={styles['cart-page__fill']}>
          <div className={styles['cart-page__products']}>
            {wines.map(wine => {
              const { imgUrl, title, price, variety, id } = wine;

              return (
                <div
                  className={classNames(
                    styles['cart-page__product'],
                    styles.product,
                  )}
                  key={id}
                >
                  <div className={styles['product__img-container']}>
                    <img
                      src={imgUrl}
                      alt={title}
                      className={styles.product__img}
                    />
                  </div>
                  <div className={styles.product__info}>
                    <h3 className={styles.product__title}>{title}</h3>
                    <p className={styles.product__variety}>{variety}</p>
                  </div>
                  <div className={styles.product__quanity}>
                    <button
                      className={classNames(
                        styles.product__button,
                        styles['product__button--minus'],
                      )}
                    ></button>
                    <p className={styles.product__count}>1</p>
                    <button
                      className={classNames(
                        styles.product__button,
                        styles['product__button--plus'],
                      )}
                    ></button>
                  </div>
                  <p className={styles.product__price}>{`$${price}`}</p>
                  <button
                    className={classNames(
                      styles.product__button,
                      styles['product__button--trash'],
                    )}
                  ></button>
                </div>
              );
            })}
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
            <p className={styles['cart-page__text']}>{`$`}</p>
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
            >{`$`}</p>
          </div>
          <button className={styles['cart-page__button']}>checkout</button>
        </div>
      </div>
    </div>
  );
};
