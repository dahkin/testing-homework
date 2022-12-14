import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './History.css';
import { List } from 'antd';
import { HistoryHeader } from '../HistoryHeader/HistoryHeader';
import { HistoryListItem } from '../HistoryListItem/HistoryListItem';
import { fetchOperations } from '@features/operations/actions';
import { Dispatch } from '@app/store';
import { getOperations } from '@features/operations/selectors';
import { maskNumber } from '@app/utils';

export const History: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const operations = useSelector(getOperations);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchOperations()).finally(() => setLoader(false));
  }, []);

  return (
    <section className="History">
      <HistoryHeader />
      <div className="History__list">
        <List
          size="small"
          itemLayout="horizontal"
          loading={isLoading}
          dataSource={operations}
          data-testid={isLoading ? 'history-list-loading' : 'history-list'}
          renderItem={(item) => (
            <HistoryListItem
              id={item.id}
              title={item.name}
              text={maskNumber(item.cardNumber)}
              value={item.value}
              isIncome={item.type === 'income'}
            />
          )}
        />
      </div>
    </section>
  );
};
