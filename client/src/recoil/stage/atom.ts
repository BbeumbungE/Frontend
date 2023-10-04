import { atom } from 'recoil';

interface StageIdState {
  currentStageId: number | null;
  highestStageId: number | null;
  itemId: number | null;
}

export const StageIdState = atom<StageIdState>({
  key: 'StageIdState',
  default: {
    currentStageId: null,
    highestStageId: null,
    itemId: 12,
  },
});
