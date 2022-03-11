import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OperationAPI } from './types';

interface InitialState {
  list: OperationAPI[];
}

const initialState: InitialState = {
  list: [],
};

const operationsSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<OperationAPI>) => {
      state.list.unshift(action.payload);
    },
    updateOperation: (
      state,
      action: PayloadAction<{
        id: OperationAPI['id'];
        newOperation: OperationAPI;
      }>
    ) => {
      const id = action.payload.id;
      const newOperation = action.payload.newOperation;

      state.list = state.list.map((item) => {
        if (item.id === id) {
          return newOperation;
        }

        return item;
      });
    },
    deleteOperation: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    setOperations: (state, action: PayloadAction<OperationAPI[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addOperation, updateOperation, deleteOperation, setOperations } = operationsSlice.actions;
export default operationsSlice.reducer;
