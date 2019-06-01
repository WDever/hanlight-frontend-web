import * as React from 'react';
import NoticeItem from 'components/main/notice/noticeItem';
import moment from 'moment';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { NoticePageProps, NoticePageMethod } from 'container/noticePage';

const { useEffect } = React;

const NoticePageComponent: React.FC<
NoticePageProps & NoticePageMethod & RouteComponentProps
> = ({
  noticeApi, noticeList, noticeStatus, loginStatus, history,
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
      return <NoticeItem title={item.title} date={date()} read={item.read} key={item.pk} />;
    });

  // useEffect(() => {
  //   if (loginStatus === 'success' && !!access_token) {
  //     noticeApi({ access_token, page: '1' });
  //   } else {
  //     history.push('/auth');
  //   }
  // }, [access_token, history, loginStatus, noticeApi]);

  useEffect(() => {
    noticeApi({ access_token, page: '1' });
  }, []);

  return <div>{NoticeList}</div>;
};

export default NoticePageComponent;
