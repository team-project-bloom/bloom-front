import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { useWines } from "../../store/WinesContext";
import styles from './Search.module.scss'

interface Props {
  onSearch: () => void
}

export const Search: React.FC<Props> = ({ onSearch }) => {
  const { wines, fetchWinesByParams, fetchAllWines } = useWines();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [historyQuery, setHistoryQuery] = useState<string[]>(() => {
    const stored = localStorage.getItem('historyQuery');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('historyQuery', JSON.stringify(historyQuery))
  }, [historyQuery]);


  const popularQuery = useMemo(() => {
    return Array.from(new Set(wines.map(i => i.title))).slice(0, 4)
  }, []);


  const handleSearch = (queryItem?:string) => {
    const value = queryItem ?? query;
    if(!value.trim()) return;

    fetchWinesByParams({ wineSearchDto: { title: [value] }, pageable: { page: 0, size: 10, sort: [] } })
    setIsOpen(false);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      setHistoryQuery(prev => [...prev, query]);
      handleSearch();
    }
  }

  const handleClickItem = (item: string) => {
    setQuery(item);
    setHistoryQuery(prev => [...prev, item]);
    handleSearch(item);
  }

  const handleClickBasket = (item: string) => {
    const updated = historyQuery.filter(i => i !== item);
    setHistoryQuery(updated);
    localStorage.setItem('historyQuery', JSON.stringify(updated))
  }

  return (
    <>
      <div className={styles.search}>
        <div
          className={classNames(
            styles.search__img,
            styles['search__img--search'],
          )}
        ></div>
        <div className={styles['search__input-container']}>
          <input type="text" className={classNames(styles['search__input'])} onChange={e => { setQuery(e.target.value); setIsOpen(true) }} onKeyDown={handleKeyDown} value={query} autoFocus/>
          {isOpen &&
            <div className={classNames(styles.modal)}>
              {historyQuery.length !== 0 && <div className={styles.modal__recent}>
                <p className={styles.modal__title}>Recent</p>
                <ul className={styles.modal__list}>
                  {historyQuery.map(item => (

                    <li className={classNames(styles.modal__item, styles['modal__item--recent'])} >
                      <p className={classNames(styles.modal__text)} onClick={() => handleClickItem(item)}>{item}</p>
                      <div className={classNames(styles.modal__item, styles['modal__item--basket'])} onClick={() => handleClickBasket(item)}></div>
                    </li>

                  ))}
                </ul>
              </div>}
              {popularQuery.length !== 0 && <div className={styles.modal__popular}>
                <p className={styles.modal__title}>Popular</p>
                <ul className={styles.modal__list}>
                  {popularQuery.map(item => (
                    <li className={classNames(styles.modal__item, styles['modal__item--popular'])} onClick={() => handleClickItem(item)}>
                      <p className={classNames(styles.modal__text)}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>}
            </div>
          }
        </div>

        <div
          className={classNames(
            styles.search__img,
            styles['search__img--close'],
          )}
          onClick={() => { onSearch(); fetchAllWines(); }}
        ></div>
      </div>

    </>
  );
};
