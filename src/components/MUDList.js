import React from 'react';
import clsx from 'clsx';
import styles from './MUDList.module.css';
import useFetch from 'react-fetch-hook';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const MUDTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.data);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return 'None';
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className={clsx(styles.mudlist)}>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              泥巴名稱
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('address')}
              className={getClassNamesFor('address')}
            >
              網路位置
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('status')}
              className={getClassNamesFor('status')}
            >
              目前狀態
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('count')}
              className={getClassNamesFor('count')}
            >
              線上人數
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('update')}
              className={getClassNamesFor('update')}
            >
              更新時間
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={`${item.address}_${item.port}`}>
            <td>
              <div className={clsx(styles.zhName)}>{item.zh_name}</div>
              <div className={clsx(styles.enName)}>{item.en_name}</div>
            </td>
            <td className={clsx(styles.host)}>
              <a
                href={`telnet://${item.address}:${item.port}/`}
                target="_blank"
              >
                <div className={clsx(styles.address)}>{item.address}</div>
                <div className={clsx(styles.port)}>{item.port}</div>
              </a>
            </td>
            {item.status ? (
              <td className={clsx(styles.online)}>連線正常</td>
            ) : (
              <td className={clsx(styles.offline)}>連線失敗</td>
            )}
            <td className={clsx(styles.count)}>
              {item.count == 'NULL' ? '-' : item.count}
            </td>
            <td>
              <div className={clsx(styles.update)}>{item.update}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MUDList = (props) => {
  const { isLoading, data } = useFetch(`../data/muds-${props.data}.json`);

  console.log(isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return <MUDTable data={data} />;
  }
};

export default MUDList;
