import { apiGetCards, apiDeleteCard, apiSaveNewCard, apiUpdateCard, CardSaveData } from '@app/api';
import { AppAction } from '@app/store';
import {
  addCard as addCardState,
  deleteCard as deleteCardState,
  updateCard as updateCardState,
  setCards as setCardsState,
} from './slice';

export const fetchCards = (): AppAction<Promise<void>> => (dispatch) => {
  return apiGetCards().then((cardsList) => {
    // @ts-ignore
    dispatch(setCardsState(cardsList));
  });
};

export const addCard =
  (data: CardSaveData): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiSaveNewCard(data).then((newCard) => {
      if (newCard) {
        // @ts-ignore
        dispatch(addCardState(newCard));
      }
    });
  };

export const updateCard =
  (id: string, data: Partial<CardSaveData>): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiUpdateCard(id, data).then((newCard) => {
      if (newCard) {
        // @ts-ignore
        dispatch(updateCardState({ id: newCard.id, newCard }));
      }
    });
  };

export const deleteCard =
  (id: string): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiDeleteCard(id).then(() => {
      // @ts-ignore
      dispatch(deleteCardState(id));
    });
  };
