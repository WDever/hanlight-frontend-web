export interface Notice {
  pk: number;
  title: string;
  content?: string;
  read?: boolean;
  createdAt: string;
}

export interface NoticeModel {
  noticeList: Notice[];
  noticeCount: number;
  getNoticeListStatus: 'none' | 'pending' | 'success' | 'failure';
  getNoticePostStatus: 'none' | 'pending' | 'success' | 'failure';
}
