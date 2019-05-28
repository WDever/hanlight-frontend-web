import * as React from 'react';
import styled from 'styled-components';
import LunchImg from 'lib/svg/jumsim-illust.svg';
import EndImg from 'lib/svg/end-time-illust.svg';
import EndTimeComponent from 'components/main/time/endTime';
import LunchTimeComponent from 'components/main/time/lunchTime';

const Template = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 7rem;
`;

const TimeWrapper = styled.div`
  height: 23.375rem;
  width: 40rem;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const EndTimeBackGroundImg = styled.img`
  height: 24.5rem;
  width: 42rem;
  z-index: 0;
  position: absolute;
`;

const LunchTimeBackGroundImg = styled.img`
  height: 16rem;
  width: 30rem;
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
