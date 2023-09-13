import { atom } from 'recoil';

interface UserToken {
  token: null | string;
}

export const UserTokenState = atom<UserToken>({
  key: 'UserTokenState',
  default: { token: null },
});
