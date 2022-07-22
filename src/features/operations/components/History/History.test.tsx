import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { History } from './History';
import { reducer } from '@app/store';
import { operationsFirebaseAPIStub } from '@features/operations/stubs';
import { getDocs } from '../../../../__mocks__/firebase/firestore';

describe('Транзакции', () => {
  beforeEach(() => {
    getDocs.mockResolvedValue(operationsFirebaseAPIStub as any);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Рендерит спиннер до загрузки данных', async () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <History />
      </Provider>
    );

    expect(screen.getByTestId('history-list-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('history-list')).toBeNull();
    // Падает с ошибкой без этой проверки
    await waitForElementToBeRemoved(() => screen.queryByTestId('history-list-loading'));
  });

  test('Рендерит список транзакций', async () => {
    getDocs.mockResolvedValue(operationsFirebaseAPIStub as any);
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <History />
      </Provider>
    );

    expect(await screen.findByTestId('history-list')).toBeInTheDocument();
    expect(screen.queryByTestId('history-list-loading')).toBeNull();

    // Рендер соответствующих транзакций
    operationsFirebaseAPIStub.forEach((item) => expect(screen.getByText(item.data().name)).toBeInTheDocument());
  });

  test('Не рендерит ничего, если список пустой', async () => {
    getDocs.mockResolvedValue([] as any);

    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <History />
      </Provider>
    );

    expect(await screen.findByTestId('history-list')).toBeInTheDocument();
    expect(screen.queryByTestId('history-list-loading')).toBeNull();
    // Транзакции не рендерятся
    expect(screen.queryByTestId('history-item')).toBeNull();
  });
});
