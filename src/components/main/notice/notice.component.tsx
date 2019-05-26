import * as React from 'react';
import styled from 'styled-components';
import NoticeList from 'container/main/notice/noticeList';

const NoticeWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
  height: 88%;
  width: 100%;
`;

const Title = styled.span`
  font-family: 'yg-jalnan';
  font-size: 2.5rem;
  margin: 3rem 0 1rem 0;
`;

const Separator = styled.div`
  width: 63rem;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
`;

const MoreBtn = styled.div`
  width: 20rem;
  height: 5rem;
  border-radius: 40px;
  border: solid 8px #ff6584;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Spoqa Han Sans';
  color: #ef3c5b;
  cursor: pointer;
`;

const NoticeComponent: React.FC = () => (
  <NoticeWrapper>
    <Separator>
      <Title>공지사항</Title>
      <NoticeList />
    </Separator>
    <MoreBtn>공지사항 전체보기</MoreBtn>
  </NoticeWrapper>
);

export default NoticeComponent;
