import classNames from 'classnames';
import React from 'react';
import { FilterOptionsList } from '../FilterOptionsList';
import { FilterOptionsRange } from '../FilterOptionsRange';
import styles from './FilterListItem.module.scss';

interface Props {
  values: (string | number)[];
  filterKey: string;
  active: boolean;
  onToggleActive: (filterKey: string) => void;
  activeOption: {
    [key: string]: (string | number)[];
  };
  onToggleOption: (key: string, value: string | number) => void;
  onToggleRange: React.Dispatch<React.SetStateAction<{}>>;
}

export const FilterListItem: React.FC<Props> = ({
  values,
  filterKey,
  active,
  onToggleActive,
  activeOption,
  onToggleOption,
  onToggleRange,
}) => {
  return (
    <>
      <div
        className={styles['filter-list__header']}
        onClick={() => onToggleActive(filterKey)}
      >
        <p className={styles['filter-list__title']}>
          {filterKey.slice(0, 1).toUpperCase() +
            filterKey.slice(1, filterKey.length)}
        </p>
        <button
          className={classNames(styles['filter-list__button'], {
            [styles['filter-list__button--arrow-down']]: !active,
            [styles['filter-list__button--arrow-up']]: active,
          })}
        ></button>
      </div>
      {active && (
        <ul className={styles['filter-list__options']}>
          {filterKey === 'price' || filterKey === 'vintage'
            ? (() => {
                const [min, max] = values as number[];

                return (
                  <FilterOptionsRange
                    filterKey={filterKey}
                    minValue={min}
                    maxValue={max}
                    onToggleRange={onToggleRange}
                  />
                );
              })()
            : values.map((value: string | number) => (
                <FilterOptionsList
                  key={value}
                  filterKey={filterKey}
                  value={value}
                  activeOption={activeOption[filterKey]}
                  onToggleOption={onToggleOption}
                />
              ))}
        </ul>
      )}
    </>
  );
};
