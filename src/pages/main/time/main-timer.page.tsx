import EndTimeComponent from 'components/main/timer/endTimer';
import LunchTimeComponent from 'components/main/timer/lunchTimer';
import EndImg from 'lib/svg/end-time-illust.svg';
import LunchImg from 'lib/svg/jumsim-illust.svg';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 7rem;
`;

const TimeWrapper = styled.div`
  height: 18rem;
  width: 30rem;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-right: 6rem;
`;

const EndTimeBackGroundImg = styled.img`
  height: 18.75rem;
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

const TimeComponent: React.FC = () => {
  return (
    <Template>
      <TimeWrapper>
        <LunchTimeBackGroundImg src={LunchImg} alt="Lunch Time Background Img" />
        <LunchTimeComponent />
      </TimeWrapper>
      <TimeWrapper>
        <EndTimeBackGroundImg src={EndImg} alt="End Time Background Img" />
        <EndTimeComponent />
      </TimeWrapper>
    </Template>

  );
};

export default TimeComponent;
