import * as React from 'react';
import styled from 'styled-components';
import {
  NoticeListProps,
  NoticeListMethod,
} from 'container/main/notice/noticeList';
import { RouteComponentProps } from 'react-router-dom';
import NoticeItem from '../noticeItem';

const { useEffect } = React;

const NoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30rem;
  margin-bottom: 5rem;
`;

const InnerWrapper = styled.div<{length: number}>`
  width: 100%;
  height: ${props => (
    `${props.length * 6}rem`
  )};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const NoticeListComponent: React.FC<
NoticeListProps & NoticeListMethod & RouteComponentProps
> = ({
  notice, noticeList, history,
}) => {
  const access_token = localStorage.getItem('accessToken');

  const NoticeList = noticeList.map((item) => {
    console.log(item);
    return (
      <NoticeItem title={item.title} date={item.updatedAt} key={item.pk} />
    );
  });

  // let NoticeList: JSX.Element[];

  useEffect(() => notice({ access_token }), [access_token, notice]);

  // useEffect(() => {
  //   NoticeList = noticeList.map((item, idx, arr) => (
  //     <NoticeItem title={item.title} date={item.updateAt} />
  //   ));
  // }, [noticeList]);

  return (
    <NoticeListWrapper>
      <InnerWrapper length={noticeList.length}>
        {NoticeList}
      </InnerWrapper>
    </NoticeListWrapper>
  );
};

export default NoticeListComponent;
