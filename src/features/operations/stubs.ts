import { OperationAPI } from '@features/operations/types';

export const operationAPIStub: Omit<OperationAPI, 'id'> = {
  name: 'Shopping',
  value: 1000,
  cardNumber: '1232 **** **** 3123',
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
    cardNumber: '1232 **** **** 3123',
    type: 'expense',
    created: {
      seconds: 123123,
      nanoseconds: 123123,
    },
  },
  {
    name: 'Salary',
    value: 1000,
    cardNumber: '6789 **** **** 3123',
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
