import HomeTimeComponent from 'components/timer/homeTimer';
import LunchTimeComponent from 'components/timer/lunchTimer';
import { Device } from 'lib/styles';
import EndImgSvg from 'lib/svg/end-time-illust.svg';
import LunchImgSvg from 'lib/svg/jumsim-illust.svg';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7rem;
`;

const Wrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const TimeWrapper = styled.div`
  height: 18rem;
  max-width: 30rem;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const EndTimeBackGroundImg = styled.img`
  height: 19.7rem;
  width: 34.21875rem;
  z-index: 0;
  position: absolute;
`;

const LunchTimeBackGroundImg = styled.img`
  height: 12.25rem;
  width: 22.5625rem;
  z-index: 0;
  position: absolute;
  padding-bottom: 2rem;
`;

const EndImgWrapper = styled.div`
  @media only screen and ${Device.laptop} {
    max-width: 30.8rem;
  }

  overflow-x: hidden;
  width: 34.21875rem;
  height: 19.7rem;
  position: absolute;
`;

const TimerComponent: React.FC = () => {
  return (
    <Template>
      <Wrapper>
        <TimeWrapper>
          <LunchTimeBackGroundImg
            src={LunchImgSvg}
            alt="Lunch Time Background Img"
          />
          <LunchTimeComponent />
        </TimeWrapper>
        <TimeWrapper style={{ marginRight: '5%' }}>
          <EndImgWrapper>
            <EndTimeBackGroundImg
              src={EndImgSvg}
              alt="End Time Background Img"
            />
          </EndImgWrapper>
          <HomeTimeComponent />
        </TimeWrapper>
      </Wrapper>
    </Template>
  );
};

export default TimerComponent;
