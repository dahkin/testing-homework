import { RootState } from '@app/store';
import { CardsAPI } from '@features/cards/types';

export const getCards = (state: RootState): CardsAPI[] => state.cards.list;
