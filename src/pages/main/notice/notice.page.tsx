import * as React from 'react';
import NoticeComponent from 'components/main/notice';
import styled from 'styled-components';

const NoticeTemplate = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const NoticePage: React.FC = () => {
  return (
    <NoticeTemplate>
      <NoticeComponent />
    </NoticeTemplate>
  );
};

export default NoticePage;
