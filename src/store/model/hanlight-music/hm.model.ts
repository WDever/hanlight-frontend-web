import { HanlightMusicItem, HanlightMusicStatus } from 'store/model';

export interface HanlightMusicModel {
  musicList: HanlightMusicItem[];
  hanlightMusicStatus: HanlightMusicStatus;
  searchList: HanlightMusicItem[];
  toggleHMstatus: boolean;
}
