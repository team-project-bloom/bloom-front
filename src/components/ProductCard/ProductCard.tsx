import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Wine } from '../../types/Wine';
import styles from './ProductCard.module.scss';

interface Props {
  wine: Wine;
  short?: boolean;
}

export const ProductCard: React.FC<Props> = ({ wine, short }) => {
  const location = useLocation().pathname.slice(1);
  const { title, price, regionId, imgUrl, variety, value, id } = wine;
  const tags = [regionId, variety, value];
  const visibleTags = short ? tags.slice(0, 4) : tags;

  return (
    <div className={styles['product-card']}>
      <Link to={`/wine/${id}`}>
        <img src={imgUrl} alt={title} className={styles['product-card__img']} />
      </Link>
      <div
        className={classNames(styles['product-card__tags'], {
          [styles['product-card__tags--short']]: short,
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
      <div className={styles['product-card__info']}>
        <p className={styles['product-card__title']}>{title}</p>
        <p className={styles['product-card__price']}>{'$' + price}</p>
        <button
          className={classNames(styles['product-card__bookmark'], {
            [styles['product-card__bookmark--active']]: true,
            [styles['product-card__bookmark--saved']]: location === 'account',
          })}
        ></button>
      </div>
    </div>
  );
};
