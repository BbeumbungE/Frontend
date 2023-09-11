import { atom } from 'recoil';

interface UserRupee {
  rupee: number;
}

export const UserRupeeState = atom<UserRupee>({
  key: 'UserRupeeState',
  default: {
    rupee: 1000,
  },
  //   dangerouslyAllowMutability: true,
});
