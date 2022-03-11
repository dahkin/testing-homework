import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './History.css';
import { List } from 'antd';
import { HistoryHeader } from '../HistoryHeader/HistoryHeader';
import { HistoryListItem } from '../HistoryListItem/HistoryListItem';
import { fetchOperaions } from '@features/operations/actions';
import { Dispatch } from '@app/store';
import { getOperations } from '@features/operations/selectors';

export const History: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const operations = useSelector(getOperations);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchOperaions()).finally(() => setLoader(false));
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
          renderItem={(item) => (
            <HistoryListItem
              id={item.id}
              title={item.name}
              text={item.cardNumber}
              balance={item.value}
              isIncome={item.type === 'income'}
            />
          )}
        />
      </div>
    </section>
  );
};
