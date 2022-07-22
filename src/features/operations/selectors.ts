import { RootState } from '@app/store';
import { OperationAPI } from '@features/operations/types';

export const getOperations = (state: RootState): OperationAPI[] => state.operations.list;
