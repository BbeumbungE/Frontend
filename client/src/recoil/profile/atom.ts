import { atom } from 'recoil';

interface UserProfile {
  character: string;
  profileImg: string;
  nickname: string;
}

export const userProfileState = atom<UserProfile>({
  key: 'userProfileState',
  default: {
    character: 'otter',
    profileImg: '../../assets/image/character/hamster.png',
    nickname: '론빵이',
  },
  //   dangerouslyAllowMutability: true,
});
