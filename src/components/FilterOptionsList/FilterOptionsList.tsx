import classNames from 'classnames';
import React from 'react';
import styles from './FilterOptionsList.module.scss';

interface Props {
  filterKey: string;
  value: string | number;
  activeOption: (string | number)[];
  onToggleOption: (key: string, value: string | number) => void;
}

export const FilterOptionsList: React.FC<Props> = ({
  value,
  filterKey,
  activeOption,
  onToggleOption,
}) => {
  return (
    <li
      className={styles.option}
      onClick={() => onToggleOption(filterKey, value)}
    >
      <div
        className={classNames(styles.option__check, {
          [styles['option__check--active']]:
            activeOption && activeOption.includes(value),
        })}
      ></div>
      <p className={styles.option__text}>{value}</p>
    </li>
  );
};
