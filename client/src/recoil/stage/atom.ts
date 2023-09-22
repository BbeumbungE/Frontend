import { atom } from 'recoil';

export const StageIdState = atom<number | null>({
  key: 'StageIdState',
  default: null,
});
