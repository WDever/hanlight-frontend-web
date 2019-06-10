import MainNoticeComponent from 'components/main/notice';
import MainNoticeContainer from 'container/main/notice';
import * as React from 'react';
import styled from 'styled-components';

const MainNoticeTemplate = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 3rem;
`;

const MainNoticePage: React.FC = () => {
  return (
    <React.Fragment>
      <MainNoticeTemplate>
        <MainNoticeContainer />
      </MainNoticeTemplate>
    </React.Fragment>
  );
};

export default MainNoticePage;
