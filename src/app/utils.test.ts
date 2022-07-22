import { maskNumber } from '@app/utils';

describe('maskNumber', () => {
  test('Номер из 16-ти символов маскируется корректно', () => {
    expect(maskNumber('1234567812345678')).toBe('1234 **** **** 5678');
  });

  test('Номер из 19-ти символов маскируется корректно', () => {
    expect(maskNumber('1234567812345678123')).toBe('1234 **** **** 8123');
  });
});
