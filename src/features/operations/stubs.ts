import { OperationAPI } from '@features/operations/types';

export const operationNewStub: Omit<OperationAPI, 'id' | 'created'> = {
  cardNumber: '1232123212321232',
  value: 1000,
  name: 'Shopping',
  type: 'expense',
};

export const operationAPIStub: Omit<OperationAPI, 'id'> = {
  name: 'Shopping',
  value: 1000,
  cardNumber: '1232123212321232',
  type: 'expense',
  created: {
    seconds: 123123,
    nanoseconds: 123123,
  },
};

export const operationsAPIStub: Omit<OperationAPI, 'id'>[] = [
  {
    name: 'Shopping',
    value: 1000,
    cardNumber: '1232123212321232',
    type: 'expense',
    created: {
      seconds: 123123,
      nanoseconds: 123123,
    },
  },
  {
    name: 'Salary',
    value: 1000,
    cardNumber: '6789678967896789',
    type: 'income',
    created: {
      seconds: 123123,
      nanoseconds: 123123,
    },
  },
];

export const operationsFirebaseAPIStub = [
  {
    data: (): Omit<OperationAPI, 'id'> => operationsAPIStub[0],
    id: 'E1TdXXx0E1mRzpRZ4r5l',
  },
  {
    data: (): Omit<OperationAPI, 'id'> => operationsAPIStub[1],
    id: 'WBA5RXV8bxMEgcrwHPd8',
  },
];
