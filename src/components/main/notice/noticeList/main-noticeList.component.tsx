/* eslint-disable camelcase */
import * as React from 'react';
import styled from 'styled-components';
import { ErrorImg } from 'lib/styles';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import {
  NoticeListProps,
  NoticeListMethod,
} from 'container/main/notice/noticeList';
import moment from 'moment';
import NoticeItem from '../noticeItem';

const { useEffect } = React;

const NoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 30rem; */
  margin-bottom: 5rem;
`;

const InnerWrapper = styled.div<{ length: number }>`
  width: 100%;
  height: ${props => `${props.length * 6}rem`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const NoticeListComponent: React.FC<NoticeListProps & NoticeListMethod> = ({
  notice,
  noticeList,
  noticeStatus,
}) => {
  const access_token = localStorage.getItem('accessToken');

  const NoticeList = noticeStatus === 'success'
    && noticeList.map((item) => {
      const date = () => {
        if (
          moment(item.createdAt).format('YYYY.MM.DD')
          === moment().format('YYYY.MM.DD')
        ) {
          if (moment(item.createdAt).format('H') === moment().format('H')) {
            return `${Number(moment().format('m'))
              - Number(moment(item.createdAt).format('m'))}분전`;
          }
          return `${Number(moment().format('H'))
            - Number(moment(item.createdAt).format('H'))}시간전`;
        }
        return moment(item.createdAt).format('YYYY.MM.DD');
      };
      return (
        <NoticeItem
          title={item.title}
          date={date()}
          read={item.read}
          key={item.pk}
        />
      );
    });

  useEffect(() => {
    notice({ access_token });
  }, [access_token, notice]);

  return (
    <NoticeListWrapper>
      <InnerWrapper length={noticeList.length}>{NoticeList}</InnerWrapper>
      {noticeStatus === 'failure' && <ErrorImg src={ErrorPng} alt="Error" />}
    </NoticeListWrapper>
  );
};

export default NoticeListComponent;
