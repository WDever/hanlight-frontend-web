import React, { useState, useEffect, ReactNodeArray } from 'react';

import {
  MainNoticeMethod,
  MainNoticeProps,
} from 'container/notice/main-notice';
import { Device } from 'lib/styles';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { Notice } from 'store';
import styled from 'styled-components';
import { MainCardWrapper } from 'lib/styles/MainCard';
import NoticeItem from './noticeItem';

/* eslint-disable @typescript-eslint/typedef */

const NoticeWrapper = styled(MainCardWrapper)`
  .title {
    margin-bottom: 0.875rem;
    margin-top: 1.75rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */

const MainNoticeComponent: React.FC<MainNoticeProps &
  MainNoticeMethod &
  RouteComponentProps> = ({
  getNoticeList,
  accessToken,
  noticeList,
  history,
}: MainNoticeProps & MainNoticeMethod & RouteComponentProps) => {
  // const [noticeList, setNoticeList]: [
  //   Notice[],
  //   React.Dispatch<React.SetStateAction<Notice[]>>,
  // ] = useState<Notice[]>([]);

  useEffect(() => {
    getNoticeList({ accessToken });
  }, []);

  const NoticeList: ReactNodeArray = Array(4)
    .fill(null)
    .map((_: null, i: number) => {
      if (typeof noticeList[i] === 'undefined') {
        return <NoticeItem read={false} key={i} />;
      }

      const item: Notice = noticeList[i];
      let date: string;

      if (moment(item.createdAt).format('l') === moment().format('l')) {
        if (moment(item.createdAt).get('hour') === moment().get('hour')) {
          date = `${moment().get('minute') -
            moment(item.createdAt).get('minute')}분전`;
        } else {
          date = `${moment().get('hour') -
            moment(item.createdAt).get('hour')}시간전`;
        }
      } else {
        date = moment(item.createdAt).format('l');
      }

      const handleClick: () => void = () => {
        history.push(`/notice/${item.pk}`);
      };

      return (
        <NoticeItem
          title={item.title}
          date={date}
          read={typeof item.read !== 'undefined' && item.read}
          key={i}
          onClick={handleClick}
        />
      );
    });

  return (
    <NoticeWrapper>
      <h1 className='title'>공지사항</h1>
      {NoticeList}
    </NoticeWrapper>
  );
};

export default MainNoticeComponent;
