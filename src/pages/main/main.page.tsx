import * as React from 'react';

import MainNoticeContainer from 'container/notice/main-notice';
import styled from 'styled-components';
import MainBoardComponent from 'components/board/main-board';
import MainTimeTableContainer from 'container/timeTable/main-timeTable';
import MainMusicComponent from 'components/music/main';
import { heightMedia } from 'lib/styles';

/* eslint-disable @typescript-eslint/typedef */

const Template = styled.div`
  width: 100%;
  height: 100%;

  display: grid;

  padding-left: 20.625rem;

  box-sizing: border-box;

  grid-template-rows: repeat(2, 24rem);
  grid-template-columns: repeat(2, 43.75rem);
  grid-gap: 2rem 3.125rem;

  ${heightMedia.desktopWBar} {
    padding-top: 2.5rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */

const MainPage: React.FC = () => {
  return (
    <Template>
      <MainNoticeContainer />
      <MainBoardComponent />
      <MainTimeTableContainer />
      <MainMusicComponent />
    </Template>
  );
};

export default MainPage;
