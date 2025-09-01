import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { WineCart, WineImg } from '../../types/Wine';
import { Quantity } from '../Quantity';
import styles from './CartItem.module.scss';

interface Props {
  wine: WineCart;
  onRemove: (wineId: number) => Promise<void>;
}

export const CartItem: React.FC<Props> = ({ wine, onRemove }) => {
  const { title, price, variety, wineId, id } = wine;
  const imgTitle = title
    .trim()
    .replace(/'$/, '')
    .replace(/\s*'\s*/g, '_')
    .replace(/\s+/g, '_')
    .toUpperCase();

  const img = WineImg[imgTitle as keyof typeof WineImg];

  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__img-container']}>
        <Link to={`/wine/${wineId}`}>
          <img src={img} alt={title} className={styles['cart-item__img']} />
        </Link>
      </div>
      <div className={styles['cart-item__info']}>
        <h3 className={styles['cart-item__title']}>{title}</h3>
        <p className={styles['cart-item__variety']}>{variety}</p>
      </div>
      <Quantity wineId={wineId}/>
      <p className={styles['cart-item__price']}>{`$${price}`}</p>
      <button
        className={classNames(
          styles['cart-item__button'],
          styles['cart-item__button--trash'],
        )}
        onClick={() => onRemove(id)}
      ></button>
    </div>
  );
};

