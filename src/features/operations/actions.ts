import {
  apiDeleteOperation,
  apiGetOperations,
  apiSaveNewOperation,
  apiUpdateOperation,
  OperationSaveData,
} from '@app/api';
import { AppAction } from '@app/store';
import {
  addOperation as addOperationState,
  deleteOperation as deleteOperationState,
  updateOperation as updateOperationState,
  setOperations as setOperationsState,
} from './slice';

export const fetchOperaions = (): AppAction<Promise<void>> => (dispatch) => {
  return apiGetOperations().then((operations) => {
    // @ts-ignore
    dispatch(setOperationsState(operations));
  });
};

export const addOperation =
  (data: OperationSaveData): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiSaveNewOperation(data).then((operaion) => {
      if (operaion) {
        // @ts-ignore
        dispatch(addOperationState(operaion));
      }
    });
  };

export const updateOperation =
  (id: string, data: Partial<OperationSaveData>): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiUpdateOperation(id, data).then((newOperation) => {
      if (newOperation) {
        // @ts-ignore
        dispatch(updateOperationState({ id: newOperation.id, newOperation }));
      }
    });
  };

export const deleteOperation =
  (id: string): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiDeleteOperation(id).then(() => {
      // @ts-ignore
      dispatch(deleteOperationState(id));
    });
  };
