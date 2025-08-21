import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Quantity } from '../../components/Quantity/Quantity';
import { useCart } from '../../hooks/useCart';
import { useFavourite } from '../../hooks/useFavourite';
import { useWine } from '../../hooks/useWine';
import { Wine, WineCart, WineImg } from '../../types/Wine';
import styles from './WinePage.module.scss';

export const WinePage = () => {
  const { favourite, removeFromFavourite, addToFavourite } = useFavourite();
  const { wineId } = useParams();
  const { wine } = useWine(Number(wineId));
  const { cart, addToCart, removeFromCart } = useCart();
  const [existing, setExisting] = useState<WineCart | null>(null);
  const [count, setCount] = useState(existing?.quantity ?? 1);

  useEffect(() => {
    setCount(existing?.quantity ?? 1);
  }, [existing?.quantity]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const found = cart.find(w => w.wineId === wine?.id);

    if (found) {
      setExisting(found);
    }
  }, [wine, cart]);

  if (!wine) {
    return <p>Wine not found</p>;
  }

  const {
    title,
    price,
    region,
    variety,
    value,
    alcohol,
    vintage,
    grape,
    description,
    id,
  }: Wine = wine;

  const tags = [region, variety, value, vintage, grape];
  const imgTitle = title
    .trim()
    .replace(/'$/, '')
    .replace(/\s*'\s*/g, '_')
    .replace(/\s+/g, '_')
    .toUpperCase();

  const img = WineImg[imgTitle as keyof typeof WineImg];

  const handleAddToCart = async () => {
    if (existing) {
      setExisting(null);
      await removeFromCart(existing.id);
    } else {
      setExisting({ ...wine, quantity: count, wineId: wine.id });
      await addToCart(id, count);
    }
  };

  const handleFavourite = () => {
    const favouriteWine =
      Array.isArray(favourite) && favourite.find(w => w.wineId === id);

    if (favouriteWine) {
      removeFromFavourite(favouriteWine.id, favouriteWine.wineId);
    } else {
      addToFavourite(id);
    }
  };

  return (
    <div className={styles['wine-page']}>
      <NavLink to={'/wines'} className={styles['wine-page__back']}>
        BACK TO WINES
      </NavLink>
      <div className={styles['wine-page__content']}>
        <div className={styles['wine-page__images']}>
          <img
            src={img}
            alt={title}
            className={styles['wine-page__img-wine']}
          />
          <img
            src="src/media/img/wine-page.png"
            alt="wine page"
            className={styles['wine-page__img-bottom']}
          />
        </div>
        <div className={styles['wine-page__info']}>
          <div className={styles['wine-page__tags']}>
            <ul className={styles.tags__list}>
              {tags.map((tag, index) => (
                <li className={styles.tags__item} key={index}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles['wine-page__info-title']}>
            <h3 className={styles['wine-page__title']}>{title}</h3>
            <h4 className={styles['wine-page__price']}>{`$${price}`}</h4>
            <div className={styles['wine-page__buttons-icon']}>
              <button
                onClick={handleFavourite}
                className={classNames(
                  styles['wine-page__button-icon'],
                  styles['wine-page__button-icon--bookmark'],
                  {
                    [styles['wine-page__button-icon--bookmark-active']]:
                      favourite.some(w => w.wineId === id),
                  },
                )}
              ></button>
              <button
                className={classNames(
                  styles['wine-page__button-icon'],
                  styles['wine-page__button-icon--share'],
                )}
              ></button>
            </div>
          </div>
          <div className={styles['wine-page__buttons']}>
            <Quantity wine={existing || wine} onCount={setCount} />
            <button
              className={classNames(styles['wine-page__add-button'], {
                [styles['wine-page__add-button--is-in-cart']]: existing,
              })}
              onClick={handleAddToCart}
            >
              {existing ? 'Remove From Cart' : 'Add to Cart'}
            </button>
          </div>
          <div className={styles['wine-page__features']}>
            <div className={styles['wine-page__feature']}>
              <p
                className={classNames(
                  styles['wine-page__key'],
                  styles['wine-page__key--grapes'],
                )}
              >
                grapes
              </p>
              <p className={styles['wine-page__value']}>{grape}</p>
            </div>
            <div className={styles['wine-page__feature']}>
              <p
                className={classNames(
                  styles['wine-page__key'],
                  styles['wine-page__key--region'],
                )}
              >
                region
              </p>
              <p className={styles['wine-page__value']}>{region}</p>
            </div>
            <div className={styles['wine-page__feature']}>
              <p
                className={classNames(
                  styles['wine-page__key'],
                  styles['wine-page__key--variety'],
                )}
              >
                variety
              </p>
              <p className={styles['wine-page__value']}>{variety}</p>
            </div>
            <div className={styles['wine-page__feature']}>
              <p
                className={classNames(
                  styles['wine-page__key'],
                  styles['wine-page__key--alcohol'],
                )}
              >
                alcohol
              </p>
              <p className={styles['wine-page__value']}>{alcohol}</p>
            </div>
            <div className={styles['wine-page__feature']}>
              <p
                className={classNames(
                  styles['wine-page__key'],
                  styles['wine-page__key--value'],
                )}
              >
                value
              </p>
              <p className={styles['wine-page__value']}>{value}</p>
            </div>
          </div>
          <div className={styles['wine-page__description']}>
            <p className={styles['wine-page__description-key']}>description</p>
            <p className={styles['wine-page__description-value']}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
