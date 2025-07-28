import classNames from 'classnames';
import { Wine } from '../../types/Wine';
import { ProductCard } from '../ProductCard';
import styles from './Popular.module.scss';

interface Props {
  wines: Wine[];
}

export const Popular: React.FC<Props> = ({ wines }) => {
  const popularWines = wines.slice(0, 4);

  return (
    <div className={styles.popular}>
      <h2 className={styles.popular__title}>Popular</h2>
      <div className={styles.popular__filters}>
        <ul className={styles.filters__list}>
          {[
            'all',
            'white',
            'red',
            'rosé',
            'orange',
            'cava',
            'pet-nat',
            'sweet',
            'spark',
          ].map((filter, index) => (
            <li className={styles.filters__item} key={index}>
              {filter}
            </li>
          ))}
        </ul>
        <button className={styles.popular__button}>SHOP ALL WINES</button>
      </div>
      <div className={styles['popular__product-cards']}>
        {popularWines.map(wine => (
          <ProductCard wine={wine} key={wine.id} popular={true} />
        ))}
      </div>
      <button
        className={classNames(
          styles.popular__button,
          styles['popular__button--mobile'],
        )}
      >
        SHOP ALL WINES
      </button>
    </div>
  );
};
