import { atom } from 'recoil';

interface UserProfile {
  profileId: number;
  character: string;
  profileImg: string | null;
  nickname: string;
}

export const UserProfileState = atom<UserProfile>({
  key: 'UserProfileState',
  default: {
    profileId: 28,
    character: 'hamster',
    profileImg: `${process.env.REACT_APP_IMG_URL}/item/avatar/hamster.png`,
    nickname: '날강두',
  },
});
