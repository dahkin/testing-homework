import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CardsList.css';
import { Spin } from 'antd';
import { Dispatch } from '@app/store';
import { CardItem } from '@features/cards/components/CardItem/CardItem';
import { fetchCards } from '@features/cards/actions';
import { getCards } from '@features/cards/selectors';

export const CardsList: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const cards = useSelector(getCards);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchCards()).then(() => {
      setLoader(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Spin>
        <section className="CardsListLoader" data-testid="cards-list-loader" />
      </Spin>
    );
  }

  return (
    <section className="CardsList" data-testid="cards-list">
      {cards.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          balance={item.balance}
          cardNumber={item.number}
          color={item.color}
          data-testid="card-item"
        />
      ))}
    </section>
  );
};
