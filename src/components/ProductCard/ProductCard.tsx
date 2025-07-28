import classNames from 'classnames';
import { Wine } from '../../types/Wine';
import styles from './ProductCard.module.scss';

interface Props {
  wine: Wine;
  popular: boolean;
}

export const ProductCard: React.FC<Props> = ({ wine, popular }) => {
  const { name, image, price, tags } = wine;

  const visibleTags = popular ? tags.slice(0, 2) : tags;

  return (
    <div className={styles['product-card']}>
      <img src={image} alt={name} className={styles['product-card__img']} />
      <div className={styles['product-card__info']}>
        <p className={styles['product-card__title']}>{name}</p>
        <p className={styles['product-card__price']}>{'$' + price}</p>
        <button
          className={classNames(styles['product-card__bookmark'], {
            [styles['product-card__bookmark--active']]: popular,
          })}
        ></button>
      </div>
      <div
        className={classNames(styles['product-card__tags'], {
          [styles['product-card__tags--popular']]: popular,
        })}
      >
        <ul className={styles.tags__list}>
          {visibleTags.map((tag, index) => (
            <li className={styles.tags__item} key={index}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
