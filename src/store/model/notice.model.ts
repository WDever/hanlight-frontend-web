export interface NoticeListItem {
  pk: number;
  title: string;
  createdAt: string;
  read: boolean;
}

export interface NoticePostItem {
  pk: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface NoticeModel {
  getNoticeListStatus: 'none' | 'pending' | 'success' | 'failure';
  getNoticePostStatus: 'none' | 'pending' | 'success' | 'failure';
  noticeList: NoticeListItem[];
  noticePost: NoticePostItem;
}
