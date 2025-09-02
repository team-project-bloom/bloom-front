import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useWines } from '../../store/WinesContext';
import { logEvent } from '../../utils/analytics';
import { FilterListItem } from '../FilterListItem';
import styles from './Filter.module.scss';

interface Props {
  onClose: () => void;
}

export const Filter: React.FC<Props> = ({ onClose }) => {
  const { fetchWinesByParams, initialFilters: FilterOptions } = useWines();

  const [activeFilter, setActiveFilter] = useState<Record<string, boolean>>({});
  const [activeOption, setActiveOption] = useState<{
    [key: string]: (string | number)[];
  }>(() => {
    try {
      const saved = localStorage.getItem('filter');

      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeRange, setActiveRange] = useState({});

  useEffect(() => {
    if (!FilterOptions) {
      return;
    }

    const prev = localStorage.getItem('filter');
    const current = JSON.stringify(activeOption);

    if (prev !== current) {
      const prevObj = prev ? JSON.parse(prev) : {};
      const updated = JSON.stringify({ ...prevObj, ...activeOption });

      localStorage.setItem('filter', updated);
    }
  }, [activeOption, FilterOptions]);


  if (!FilterOptions) {
    return null;
  }

  const toggleOption = (key: string, value: string | number) => {
    setActiveOption(prev => {
      const currentValue = prev[key];

      if (!currentValue) {
        return { ...prev, [key]: [value] };
      }

      if (currentValue.includes(value)) {
        const newValue = currentValue.filter(v => v !== value);


        return { ...prev, [key]: newValue };


      }

      return { ...prev, [key]: [...currentValue, value] };
    });
  };

  const toggleActive = (key: string) => {
    setActiveFilter(prev => {
      if (prev[key]) {
        const { [key]: _, ...rest } = prev;

        return rest;
      }

      return { ...prev, [key]: true };
    });
  };

  const handleDone = () => {
    logEvent('apply_filter', {
      activeOption
    })

    fetchWinesByParams({
      wineSearchDto: { ...activeOption, ...activeRange },
      pageable: { page: 0, size: 10, sort: [] },
    });
    onClose();
  };

  const handleCancel = () => {
    setActiveOption({});
    fetchWinesByParams({
      wineSearchDto: {},
      pageable: { page: 0, size: 10, sort: [] },
    });
  };

  return (
    <div className={styles['filter-modal__wrapper']}>
      <div className={styles['filter-modal__content']}>
        <h3 className={styles['filter-modal__title']}>Filters</h3>
        <button
          className={classNames(
            styles['filter-modal__button'],
            styles['filter-modal__button--close'],
          )}
          onClick={onClose}
        ></button>
        <ul className={styles['filter-modal__list']}>
          {Object.entries(FilterOptions).map(([key, values]) => (
            <li className={styles['filter-modal__item']} key={key}>
              <FilterListItem
                values={values}
                filterKey={key}
                active={activeFilter[key]}
                onToggleActive={() => toggleActive(key)}
                activeOption={activeOption}
                onToggleOption={toggleOption}
                onToggleRange={setActiveRange}
              />
            </li>
          ))}
        </ul>
        <button
          className={classNames(
            styles['filter-modal__big-button'],
            styles['filter-modal__big-button--done'],
          )}
          onClick={handleDone}
        >
          done
        </button>
        <button
          className={classNames(
            styles['filter-modal__big-button'],
            styles['filter-modal__big-button--cancel'],
          )}
          onClick={handleCancel}
        >
          cancel
        </button>
      </div>
    </div>
  );
};
