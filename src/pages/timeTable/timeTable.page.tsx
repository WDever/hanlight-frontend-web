import TimeTableContainer from 'container/timeTable';
import { Empty } from 'lib/styles';
import LeftSvg from 'lib/svg/left-illust.svg';
import RightSvg from 'lib/svg/right-illust.svg';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150%;
  z-index: 1;
`;

const Background = styled.div`
  width: 80%;
  height: 88%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 0;
`;

const LeftImg = styled.img`
  /* width: 12rem;
  height: 32.625rem; */
  z-index: 0;
`;

const RightImg = styled.img`
  width: 56.875rem;
  height: 52rem;
  z-index: 0;
`;

const TimeTablePage = () => {
  return (
    <>
      <Empty />
      <Template>
        <Background>
          <LeftImg src={LeftSvg} alt="left illust" />
          <RightImg src={RightSvg} alt="right illust" />
        </Background>
        <TimeTableContainer />
      </Template>
    </>
  );
};

export default TimeTablePage;
