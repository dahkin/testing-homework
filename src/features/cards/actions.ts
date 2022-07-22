import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCards, apiDeleteCard, apiSaveNewCard, apiUpdateCard, CardSaveData } from '@app/api';
import {
  addCard as addCardState,
  deleteCard as deleteCardState,
  updateCard as updateCardState,
  setCards as setCardsState,
} from './slice';

export const fetchCards = createAsyncThunk('api/fetchCards', async (_, thunk) => {
  return apiGetCards().then((cardsList) => {
    thunk.dispatch(setCardsState(cardsList));
  });
});

export const addCard = createAsyncThunk('api/addCard', async (data: CardSaveData, thunk) => {
  const newCard = await apiSaveNewCard(data);

  if (newCard !== null) {
    thunk.dispatch(addCardState(newCard));
  }
});

export const updateCard = createAsyncThunk(
  'api/updateCard',
  async (params: { id: string; data: Partial<CardSaveData> }, thunk) => {
    return apiUpdateCard(params.id, params.data).then((newCard) => {
      if (newCard) {
        thunk.dispatch(updateCardState({ id: newCard.id, newCard }));
      }
    });
  }
);

export const deleteCard = createAsyncThunk('api/deleteCard', async (id: string, thunk) => {
  return apiDeleteCard(id).then(() => {
    thunk.dispatch(deleteCardState(id));
  });
});
