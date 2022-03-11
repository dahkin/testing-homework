import { RootState } from '@app/store';

export const getOperations = (state: RootState) => state.operations.list;
