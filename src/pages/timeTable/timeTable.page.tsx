import TimeTableContainer from 'container/timeTable';
import LeftSvg from 'lib/svg/left-illust.svg';
import RightSvg from 'lib/svg/right-illust.svg';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Background = styled.div`
  width: 80%;
  height: 85%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: -1;
`;

const LeftImg = styled.img`
  z-index: -1;
`;

const RightImg = styled.img`
  width: 56.875rem;
  height: 52rem;
  z-index: -1;
`;

const TimeTablePage = () => {
  return (
    <>
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
