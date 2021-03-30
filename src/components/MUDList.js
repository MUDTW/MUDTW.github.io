import React from 'react';

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

const MUDList = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.data);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={`red ${getClassNamesFor('name')}`}
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
              onClick={() => requestSort('port')}
              className={getClassNamesFor('port')}
            >
              連接埠
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
          <tr key={item.id}>
            <td>
              <div className="zhName">{item.zh_name}</div>
              <div className="enName">{item.en_name}</div>
            </td>
            <td>{item.address}</td>
            <td>{item.port}</td>
            <td>{item.status ? 'O' : 'X'}</td>
            <td>{item.count}</td>
            <td>{item.update}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MUDList;
