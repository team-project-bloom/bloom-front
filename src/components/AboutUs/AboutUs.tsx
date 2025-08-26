import classNames from 'classnames';
import styles from './AboutUs.module.scss';

export const AboutUs: React.FC = () => {
  return (
    <div className={styles.about}>
      <h2 className={styles.about__title}>About Us</h2>
      <div className={styles.about__content}>
        <img
          src="../media/img/about-us-1.png"
          alt="about-us-1"
          className={classNames(styles.about__img, styles['about__img--1'])}
        />
        <p className={classNames(styles.about__text, styles['about__text--1'])}>
          We are a modern digital destination for wine lovers, curating
          exceptional wines from around the world with a focus on quality,
          character, and experience.
        </p>
        <img
          src="../media/img/about-us-2.png"
          alt="about-us-2"
          className={classNames(styles.about__img, styles['about__img--2'])}
        />
        <p className={classNames(styles.about__text, styles['about__text--2'])}>
          Founded with a passion for wine culture, it quickly evolved from a
          catalog into a trusted guide for finding the perfect bottle.
        </p>
        <img
          src="../media/img/about-us-3.png"
          alt="about-us-3"
          className={classNames(styles.about__img, styles['about__img--3'])}
        />
        <p className={classNames(styles.about__text, styles['about__text--3'])}>
          We believe in the power of taste, stories, and people. We were built
          to connect — over a glass our wine, wherever you are: at home, with
          friends, or celebrating a special moment.
        </p>
      </div>
    </div>
  );
};
