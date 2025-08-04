import classNames from 'classnames';
import { Nav } from '../Nav';
import styles from './Menu.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
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
