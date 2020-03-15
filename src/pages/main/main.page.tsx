import * as React from 'react';

import MainNoticeContainer from 'container/notice/main-notice';
import styled from 'styled-components';
import MainBoardComponent from 'components/board/main-board';
import MainTimeTableContainer from 'container/timeTable/main-timeTable';

/* eslint-disable @typescript-eslint/typedef */

const Template = styled.div`
  width: 100%;
  height: 100%;

  display: grid;

  padding-left: 20.625rem;
  padding-top: 8.625rem;

  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(2, 43.75rem);
  grid-gap: 3.125rem;
`;

/* eslint-enable @typescript-eslint/typedef */

const MainPage: React.FC = () => {
  return (
    <Template>
      <MainNoticeContainer />
      <MainBoardComponent />
      <MainTimeTableContainer />
    </Template>
  );
};

export default MainPage;
