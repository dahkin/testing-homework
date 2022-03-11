import { RootState } from '@app/store';

export const getCards = (state: RootState) => state.cards.list;
