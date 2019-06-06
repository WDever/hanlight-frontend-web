/* eslint-disable camelcase */
import {
  NoticeListMethod,
  NoticeListProps,
} from 'container/main/notice/noticeList';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import { ErrorImg } from 'lib/styles';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
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
  height: ${props => `${props.length * 5}rem`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const NoticeListComponent: React.FC<NoticeListProps & NoticeListMethod> = ({
  notice,
  noticeList,
  noticeStatus,
  accessToken,
}) => {
  let length = 0;
  const NoticeList =
    noticeStatus === 'success' &&
    noticeList.map((item, idx) => {
      const date = () => {
        if (
          moment(item.createdAt).format('YYYY.MM.DD') ===
          moment().format('YYYY.MM.DD')
        ) {
          if (moment(item.createdAt).format('H') === moment().format('H')) {
            return `${Number(moment().format('m')) -
              Number(moment(item.createdAt).format('m'))}분전`;
          }
          return `${Number(moment().format('H')) -
            Number(moment(item.createdAt).format('H'))}시간전`;
        }
        return moment(item.createdAt).format('YYYY.MM.DD');
      };

      if (idx <= 4) {
        length += 1;
        return (
          <NoticeItem
            title={item.title}
            date={date()}
            read={item.read}
            key={item.pk}
          />
        );
      }
    });

  useEffect(() => {
    notice({ accessToken });
  }, [accessToken, notice]);

  return (
    <NoticeListWrapper>
      <InnerWrapper length={length}>{NoticeList}</InnerWrapper>
      {noticeStatus === 'failure' && <ErrorImg src={ErrorPng} alt="Error" />}
    </NoticeListWrapper>
  );
};

export default NoticeListComponent;
