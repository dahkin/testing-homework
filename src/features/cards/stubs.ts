import { CardsAPI } from '@features/cards/types';

export const cardNewStub: Omit<CardsAPI, 'id' | 'created'> = {
  number: '1232 **** **** 3123',
  balance: 4554,
  color: 'pink',
};

export const cardAPIStub: Omit<CardsAPI, 'id'> = {
  balance: 4554,
  color: 'pink',
  number: '1232 **** **** 3123',
  created: {
    seconds: 123123,
    nanoseconds: 123123,
  },
};

export const cardsAPIStub: Omit<CardsAPI, 'id'>[] = [
  {
    balance: 4554,
    color: 'pink',
    number: '1232 **** **** 3123',
    created: {
      seconds: 123123,
      nanoseconds: 123123,
    },
  },
  {
    balance: 4554,
    color: 'pink',
    number: '6789 **** **** 3123',
    created: {
      seconds: 123123,
      nanoseconds: 123123,
    },
  },
];

export const cardsFirebaseAPIStub = [
  {
    data: (): Omit<CardsAPI, 'id'> => cardsAPIStub[0],
    id: 'E1TdXXx0E1mRzpRZ4r5l',
  },
  {
    data: (): Omit<CardsAPI, 'id'> => cardsAPIStub[1],
    id: 'WBA5RXV8bxMEgcrwHPd8',
  },
];
