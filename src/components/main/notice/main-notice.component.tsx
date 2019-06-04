import * as React from 'react';

import NoticeList from 'container/main/notice/noticeList';
import NoticeIllust from 'lib/svg/notice-illust.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoticeWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* justify-content: space-around; */
  justify-content: center;
  align-items: center;
  /* height: 88%; */
  width: 100%;
`;

const Title = styled.span`
  font-family: 'yg-jalnan';
  font-size: 1.875rem;
  margin: 2rem 0 1rem 0;
`;

const Separator = styled.div`
  width: 48.2rem;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  margin-left: -5rem;
`;

const BtnWrapper = styled.div`
  margin-left: 8.5rem;
  width: 18.4375rem;
  display: inline-flex;
  justify-content: center;
`;

const BtnBackGroundImg = styled.img`
  width: 18.4375rem;
  height: 14.8rem;
  z-index: 0;
  position: absolute;
`;

const MoreBtn = styled(Link)`
  width: 15.3rem;
  height: 3.75rem;
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
  z-index: 1;
  text-decoration: none;
  background-color: #ffffff;
`;

const NoticeComponent: React.FC = () => (
  <NoticeWrapper>
    <Separator>
      <Title>공지사항</Title>
      <NoticeList />
    </Separator>
    <BtnWrapper>
      <BtnBackGroundImg src={NoticeIllust} alt="Notice Background Img" />
      <MoreBtn to="/notice">공지사항 전체보기</MoreBtn>
    </BtnWrapper>
  </NoticeWrapper>
);

export default NoticeComponent;
