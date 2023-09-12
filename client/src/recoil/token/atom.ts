import { atom } from 'recoil';

interface UserToken {
  token: string;
}

export const UserTokenState = atom<UserToken>({
  key: 'UserTokenState',
  default: { token: '' },
});
