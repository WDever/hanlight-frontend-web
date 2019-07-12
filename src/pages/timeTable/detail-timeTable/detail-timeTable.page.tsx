import TimeTableContainer from 'container/timeTable/detail-timeTable';
import { Device } from 'lib/styles';
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
  width: 100%;
  height: 85%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: -1;
  overflow-x: hidden;

  @media ${Device.tabletL} {
    display: none;
  }
`;

const LeftImg = styled.img`
  z-index: -1;

  @media ${Device.mobileL} {
    display: none;
  }
`;

const RightImg = styled.img`
  z-index: -1;
  margin-left: 3%;

  @media ${Device.mobileL} {
    display: none;
  }
`;

const DetailTimeTablePage = () => {
  return (
    <>
      <Template>
        <Background>
          <LeftImg src={LeftSvg} alt='left illust' />
          <RightImg src={RightSvg} alt='right illust' />
        </Background>
        <TimeTableContainer />
      </Template>
    </>
  );
};

export default DetailTimeTablePage;
