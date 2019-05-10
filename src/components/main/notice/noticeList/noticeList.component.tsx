import * as React from 'react';
import styled from 'styled-components';
import NoticeItem from '../noticeItem';

const NoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 29.44rem;
  /* margin-bottom: 5rem; */
`;

const NoticeListComponent: React.FC = () => {
  return (
    <NoticeListWrapper>
      <NoticeItem date="1 일전" title="다음주에 열리는 체육대회에 관한 공지사항입니다" />
      <NoticeItem date="1 일전" title="다음주에 열리는 체육대회에 관한 공지사항입니다" />
      <NoticeItem date="1 일전" title="다음주에 열리는 체육대회에 관한 공지사항입니다" />
      <NoticeItem date="1 일전" title="다음주에 열리는 체육대회에 관한 공지사항입니다" />
      <NoticeItem date="1 일전" title="다음주에 열리는 체육대회에 관한 공지사항입니다" />
    </NoticeListWrapper>
  );
};

export default NoticeListComponent;
