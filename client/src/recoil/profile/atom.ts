import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
interface UserProfile {
  profileId: number;
  character: string;
  profileImg: string | null;
  nickname: string;
}

export const UserProfileState = atom<UserProfile>({
  key: 'UserProfileState',
  default: {
    profileId: 2,
    character: 'hamster',
    profileImg: `${process.env.REACT_APP_IMG_URL}/item/avatar/hamster.png`,
    nickname: '론빵이',
  },
  effects_UNSTABLE: [persistAtom],
});
