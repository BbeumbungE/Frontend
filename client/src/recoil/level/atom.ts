import { atom } from 'recoil';

export const levelDataState = atom<number | null>({
  key: 'levelDataState',
  default: null,
});
