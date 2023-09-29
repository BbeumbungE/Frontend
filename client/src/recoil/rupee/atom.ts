import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
interface UserRupee {
  rupee: number;
}

export const UserRupeeState = atom<UserRupee>({
  key: 'UserRupeeState',
  default: {
    rupee: 1000,
  },
  effects_UNSTABLE: [persistAtom],
  //   dangerouslyAllowMutability: true,
});
