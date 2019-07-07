import * as React from 'react';

import {
  MainNoticeMethod,
  MainNoticeProps,
} from 'container/notice/main-notice';
import { Device } from 'lib/styles';
import NoticeIllustSvg from 'lib/svg/notice-illust.svg';
import moment from 'moment';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Notice } from 'store';
import styled from 'styled-components';
import NoticeItem from './noticeItem';

const NoticeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 81rem;
  width: 90%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  @media ${Device.tablet} {
    margin-top: 1.626rem;
    margin-bottom: 0;
  }
`;

const Title = styled.span`
  font-family: 'yg-jalnan';
  font-size: 1.875rem;

  @media ${Device.tablet} {
    font-size: 1.5rem;
  }
  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const MobileBtn = styled(Link)`
  display: none;

  @media ${Device.tablet} {
    display: unset;
    color: #6787ec;
    text-decoration: none;
    font-size: 1rem;
    font-family: 'Spoqa Han Sans';
    margin-right: 1.5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${Device.mobileL} {
    font-size: 0.69rem;
  }
`;

const Separator = styled.div`
  width: 60%;
  max-width: 48.2rem;
  height: 100%;
  display: inline-flex;
  flex-direction: column;

  @media ${Device.tablet} {
    width: 100%;
    max-width: unset;
  }
`;

const BtnWrapper = styled.div`
  margin: 0 5%;
  width: 18.4375rem;
  display: inline-flex;
  justify-content: center;

  @media ${Device.tablet} {
    display: none;
  }
`;

const NoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5rem;

  @media ${Device.tablet} {
    margin-bottom: 0;
  }
`;

const InnerWrapper = styled.div<{ length: number }>`
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media ${Device.tablet} {
    height: 19rem;
  }
  @media ${Device.mobileL} {
    height: 14.24rem;
  }
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
  border: solid 6px #ff6584;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: 'Spoqa Han Sans';
  color: #ef3c5b;
  cursor: pointer;
  z-index: 1;
  text-decoration: none;
  background-color: #ffffff;
`;

class MainNoticeComponent extends React.Component<
  MainNoticeProps & MainNoticeMethod & RouteComponentProps<any>
> {
  public state: { noticeList: Notice[] } = {
    noticeList: [],
  };

  public componentDidMount() {
    this.props.getNoticeList({ accessToken: this.props.accessToken });
  }

  public render() {
    const NoticeList = this.props.noticeList.slice(0, 5).map(item => {
      const date =
        moment(item.createdAt).format('YYYY.MM.DD') ===
        moment().format('YYYY.MM.DD')
          ? moment(item.createdAt).format('H') === moment().format('H')
            ? `${Number(moment().format('m')) -
                Number(moment(item.createdAt).format('m'))}분전`
            : `${Number(moment().format('H')) -
                Number(moment(item.createdAt).format('H'))}시간전`
          : moment(item.createdAt).format('YYYY.MM.DD');

      return (
        <NoticeItem
          title={item.title}
          date={date}
          read={!!item.read}
          key={item.pk}
          onClick={() => this.props.history.push(`/notice/${item.pk}`)}
        />
      );
    });
    return (
      <NoticeWrapper>
        <Separator>
          <TitleWrapper>
            <Title>공지사항</Title>
            <MobileBtn to="/notice">전체보기 ></MobileBtn>
          </TitleWrapper>
          <NoticeListWrapper>
            <InnerWrapper length={NoticeList.length}>
              {this.props.getNoticeListStatus === 'success' && NoticeList}
            </InnerWrapper>
          </NoticeListWrapper>
        </Separator>
        <BtnWrapper>
          <BtnBackGroundImg src={NoticeIllustSvg} alt="Notice Background Img" />
          <MoreBtn to="/notice">공지사항 전체보기</MoreBtn>
        </BtnWrapper>
      </NoticeWrapper>
    );
  }
}

export default MainNoticeComponent;
