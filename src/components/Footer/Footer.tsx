import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

interface Props {}

export const Footer: React.FC<Props> = ({}) => {
  return (
    <div className={styles.footer}>
      <div className={styles['footer__icons-and-logo']}>
        <Link to="home" className={styles.footer__link}>
          <p className={styles.footer__logo}>bloom</p>
        </Link>
        <ul className={styles.footer__icons}>
          <li className={styles.footer__icon}>
            <a
              href="#"
              className={classNames(
                styles['footer__icon-link'],
                styles['footer__icon-link--facebook'],
              )}
            ></a>
          </li>
          <li className={styles.footer__icon}>
            <a
              href="#"
              className={classNames(
                styles['footer__icon-link'],
                styles['footer__icon-link--instagram'],
              )}
            ></a>
          </li>
          <li className={styles.footer__icon}>
            <a
              href="#"
              className={classNames(
                styles['footer__icon-link'],
                styles['footer__icon-link--phone'],
              )}
            ></a>
          </li>
        </ul>
      </div>
      <div className={styles.footer__nav}>
        <ul className={styles.footer__items}>
          <li className={styles.footer__item}>CONTACTS</li>
          <li className={styles.footer__item}>EXCHANGES & RETURNS</li>
          <li className={styles.footer__item}>TERMS OF SERVICE</li>
          <li className={styles.footer__item}>PAYMENT & DELIVERY</li>
          <li className={styles.footer__item}>F.A.Q.</li>
          <li className={styles.footer__item}>PRIVACY POLICY</li>
        </ul>
      </div>
      <div className={styles.footer__subscribe}>
        <label htmlFor="subscribe" className={styles.footer__label}>
          Subscribe to our newsletter to receive exclusive offers!
        </label>
        <input
          type="text"
          value=""
          id="subscribe"
          name="subscribe"
          className={styles.footer__input}
          placeholder="Your E-Mail"
        />
      </div>
    </div>
  );
};
