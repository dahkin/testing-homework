import { getDoc, getDocs, Timestamp, addDoc } from '../__mocks__/firebase/firestore';
import { apiGetCard, apiGetCards, apiGetOperation, apiGetOperations, apiSaveNewCard } from '@app/api';
import { cardAPIStub, cardNewStub, cardsFirebaseAPIStub } from '@features/cards/stubs';
import { operationAPIStub, operationsFirebaseAPIStub } from '@features/operations/stubs';

describe('apiGetCard', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Возвращает карту после загрузки', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => cardAPIStub,
      id,
    } as any);

    const card = await apiGetCard(id);

    expect(card).toEqual({
      id,
      ...cardAPIStub,
    });
  });

  test('Возвращает ошибку, если карты нет', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => false,
      data: () => null,
      id,
    } as any);

    const card = apiGetCard(id);

    await expect(card).rejects.toThrowError();
  });
});

describe('apiGetCards', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Возвращает список карт после загрузки', async () => {
    getDocs.mockResolvedValue(cardsFirebaseAPIStub as any);

    const cards = await apiGetCards();

    expect(cards).toEqual([
      {
        id: cardsFirebaseAPIStub[0].id,
        ...cardsFirebaseAPIStub[0].data(),
      },
      {
        id: cardsFirebaseAPIStub[1].id,
        ...cardsFirebaseAPIStub[1].data(),
      },
    ]);
  });

  test('Возвращает null, если карт нет', async () => {
    getDoc.mockResolvedValue({} as any);

    const card = apiGetCards();

    await expect(card).rejects.toThrowError();
  });
});

describe('apiSaveNewCard', () => {
  beforeEach(() => {
    const id = '1';

    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => cardAPIStub,
      id,
    } as any);

    const time = {
      seconds: 123123,
      nanoseconds: 123123,
    };
    Timestamp.now.mockResolvedValue(time as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Возвращает новую карту после добавления', async () => {
    const id = '1';
    addDoc.mockResolvedValue({
      id,
    } as any);

    const card = await apiSaveNewCard(cardNewStub);
    expect(card).toEqual({
      id,
      created: {
        seconds: 123123,
        nanoseconds: 123123,
      },
      ...cardNewStub,
    });
  });

  test('Возвращает ошибку, если карта не добавилась', async () => {
    addDoc.mockResolvedValue({} as any);
    getDoc.mockResolvedValue({} as any);

    const card = apiSaveNewCard(cardNewStub);

    await expect(card).rejects.toThrowError();
  });
});

describe('apiGetOperation', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Возвращает транзакцию после загрузки', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => operationAPIStub,
      id,
    } as any);

    const operation = await apiGetOperation(id);

    expect(operation).toEqual({
      id,
      ...operationAPIStub,
    });
  });

  test('Возвращает ошибку, если транзакции нет', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => false,
      data: () => null,
      id,
    } as any);

    const operation = apiGetOperation(id);

    await expect(operation).rejects.toThrowError();
  });
});

describe('apiGetOperations', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Возвращает список транзакций после загрузки', async () => {
    getDocs.mockResolvedValue(operationsFirebaseAPIStub as any);

    const operations = await apiGetOperations();

    expect(operations).toEqual([
      {
        id: operationsFirebaseAPIStub[0].id,
        ...operationsFirebaseAPIStub[0].data(),
      },
      {
        id: operationsFirebaseAPIStub[1].id,
        ...operationsFirebaseAPIStub[1].data(),
      },
    ]);
  });

  test('Возвращает null, если транзакций нет', async () => {
    getDoc.mockResolvedValue({} as any);

    const operations = apiGetOperations();

    await expect(operations).rejects.toThrowError();
  });
});
