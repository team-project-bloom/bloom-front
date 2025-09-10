import React, { useEffect, useMemo, useState } from 'react';
import styles from './FilterOptionsRange.module.scss';

interface Props {
  filterKey: string;
  minValue: number;
  maxValue: number;
  onToggleRange: React.Dispatch<React.SetStateAction<{}>>;
}

export const FilterOptionsRange: React.FC<Props> = ({
  filterKey,
  minValue,
  maxValue,
  onToggleRange,
}) => {
  const getInitialValues = () => {
    const saved = localStorage.getItem('filter');

    if (saved) {
      const parsed = JSON.parse(saved);

      if (filterKey === 'price') {
        return {
          min: parsed.priceFrom ?? minValue,
          max: parsed.priceTo ?? maxValue,
        };
      } else {
        return {
          min: parsed.vintageFrom ?? minValue,
          max: parsed.vintageTo ?? maxValue,
        };
      }
    }

    return { min: minValue, max: maxValue };
  };

  const [{ min, max }, setRange] = useState(getInitialValues);

  const keyName = useMemo(
    () =>
      filterKey === 'price'
        ? { priceFrom: min, priceTo: max }
        : { vintageFrom: min, vintageTo: max },
    [filterKey, min, max],
  );

  useEffect(() => {
    onToggleRange(keyName);

    const prev = localStorage.getItem('filter');
    const prevObj = prev ? JSON.parse(prev) : {};
    const updated = { ...prevObj};

    if (filterKey === 'price') {
      if (min !== minValue) {
        updated.priceFrom = min;
      } else {
        delete updated.priceFrom;
      }

      if (max !== maxValue) {
        updated.priceTo = max;
      } else {
        delete updated.priceTo;
      }
    } else {
      if (min !== minValue) {
        updated.vintageFrom = min;
      } else {
        delete updated.vintageFrom;
      }

      if (max !== maxValue) {
        updated.vintageTo = max;
      } else {
        delete updated.vintageTo;
      }
    }

    localStorage.setItem('filter', JSON.stringify(updated));
  }, [min, max, keyName, onToggleRange]);

  const handleMinValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;

    if (newValue <= max) {
      setRange(prev => ({ ...prev, min: newValue }));
    }
  };

  const handleMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;

    if (newValue >= min) {
      setRange(prev => ({ ...prev, max: newValue }));
    }
  };

  return (
    <div className={styles['option-range']}>
      <div className={styles['option-range__dual-range']}>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={min}
          className={styles['option-range__range']}
          step={filterKey === 'price' ? '0.1' : '1'}
          onChange={handleMinValue}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={max}
          className={styles['option-range__range']}
          step={filterKey === 'price' ? '0.1' : '1'}
          onChange={handleMaxValue}
        />
      </div>
      <div className={styles['option-range__values']}>
        <p className={styles['option-range__value']}>{min}</p>
        <p className={styles['option-range__value']}>{max}</p>
      </div>
    </div>
  );
};
