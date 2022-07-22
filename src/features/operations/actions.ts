import {
  apiDeleteOperation,
  apiGetOperations,
  apiSaveNewOperation,
  apiUpdateOperation,
  OperationSaveData,
} from '@app/api';
import {
  addOperation as addOperationState,
  deleteOperation as deleteOperationState,
  updateOperation as updateOperationState,
  setOperations as setOperationsState,
} from './slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOperations = createAsyncThunk('api/fetchOperations', async (_, thunk) => {
  return apiGetOperations().then((operations) => {
    thunk.dispatch(setOperationsState(operations));
  });
});

export const addOperation = createAsyncThunk('api/addOperation', async (data: OperationSaveData, thunk) => {
  return apiSaveNewOperation(data).then((operation) => {
    if (operation) {
      thunk.dispatch(addOperationState(operation));
    }
  });
});

export const updateOperation = createAsyncThunk(
  'api/updateOperation',
  async (params: { id: string; data: Partial<OperationSaveData> }, thunk) => {
    return apiUpdateOperation(params.id, params.data).then((newOperation) => {
      if (newOperation) {
        thunk.dispatch(updateOperationState({ id: newOperation.id, newOperation }));
      }
    });
  }
);

export const deleteOperation = createAsyncThunk('api/deleteOperation', async (id: string, thunk) => {
  return apiDeleteOperation(id).then(() => {
    thunk.dispatch(deleteOperationState(id));
  });
});
