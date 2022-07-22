import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CardsList } from './CardsList';
import { reducer } from '@app/store';
import { cardsFirebaseAPIStub } from '@features/cards/stubs';
import { getDocs } from '../../../../__mocks__/firebase/firestore';

describe('Карты', () => {
  beforeEach(() => {
    getDocs.mockResolvedValue(cardsFirebaseAPIStub as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Рендерит спиннер до загрузки данных', async () => {
    // Не получилось вынести в beforeEach, лоадинг стейт тогда не ловится
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <CardsList />
      </Provider>
    );

    expect(screen.getByTestId('cards-list-loader')).toBeInTheDocument();
    expect(screen.queryByTestId('cards-list')).toBeNull();
    // Падает с ошибкой без этой проверки
    await waitForElementToBeRemoved(() => screen.queryByTestId('cards-list-loader'));
  });

  test('Рендерит список карт', async () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <CardsList />
      </Provider>
    );

    expect(await screen.findByTestId('cards-list')).toBeInTheDocument();
    expect(screen.queryByTestId('cards-list-loader')).toBeNull();

    // Рендер соответствующих карточек
    cardsFirebaseAPIStub.forEach((card) => expect(screen.getByText(card.data().number)).toBeInTheDocument());
  });

  test('Не рендерит ничего, если список пустой', async () => {
    getDocs.mockResolvedValue([] as any);

    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <CardsList />
      </Provider>
    );

    expect(await screen.findByTestId('cards-list')).toBeInTheDocument();
    expect(screen.queryByTestId('cards-list-loader')).toBeNull();
    // Карты не рендерятся
    expect(screen.queryByTestId('card-item')).toBeNull();
  });
});
