import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Wine, WineFavourite } from '../../types/Wine';
import styles from './ProductCard.module.scss';
import { WineImg } from '../../types/Wine';
import { useFavourite } from '../../hooks/useFavourite';

interface Props {
  wine: Wine | WineFavourite;
  short?: boolean;
}

export const ProductCard: React.FC<Props> = ({ wine, short }) => {
  const { favourite, addToFavourite, removeFromFavourite } = useFavourite();
  const location = useLocation().pathname.slice(1);
  const wineId = (wine as WineFavourite).wineId ?? wine.id;

  const { title, price, region, variety, value } = wine;
  const tags = [region, variety, value];
  const visibleTags = short ? tags.slice(0, 2) : tags;
  const imgTitle = title
    .trim()
    .replace(/'$/, '')
    .replace(/\s*'\s*/g, '_')
    .replace(/\s+/g, '_')
    .toUpperCase();

  const img = WineImg[imgTitle as keyof typeof WineImg];

  const handleFavourite = () => {
    const favouriteWine =
      Array.isArray(favourite) && favourite.find(w => w.wineId === wineId);

    if (favouriteWine) {
      removeFromFavourite(favouriteWine.id, favouriteWine.wineId);
    } else {
      addToFavourite(wineId);
    }
  };

  return (
    <div className={styles['product-card']}>
      <Link to={`/wine/${wineId}`}>
        <img src={img} alt={title} className={styles['product-card__img']} />
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
            [styles['product-card__bookmark--active']]: favourite.some(
              w => w.wineId === wineId,
            ),
            [styles['product-card__bookmark--saved']]: location === 'account',
          })}
          onClick={handleFavourite}
        ></button>
      </div>
    </div>
  );
};
