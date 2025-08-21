import classNames from 'classnames';
import { useEffect } from 'react';
import { Nav } from '../Nav';
import styles from './Menu.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <aside
      className={classNames(styles.menu, 'page__menu', {
        open: isOpen,
      })}
    >
      <Nav isMenu={isOpen} onLinkClick={onClose} />
    </aside>
  );
};
