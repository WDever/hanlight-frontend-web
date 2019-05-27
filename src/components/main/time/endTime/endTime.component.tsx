import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const { useState, useEffect } = React;

const TimeBox = styled.div`
  height: 23.375rem;
  width: 40rem;
  z-index: 1;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 3rem;
  font-family: 'yg-jalnan';
  font-size: 2.5rem;
`;

const TimeWrapper = styled.div`
  vertical-align: bottom;
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  height: 5.5rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 4.625rem;
  color: #4470ff;
`;

const InnerWrapper = styled.div`
  display: table;
  vertical-align: bottom;
`;

const Unit = styled.span`
  font-family: 'yg-jalnan';
  font-size: 2.3rem;
  font-weight: normal;
  color: black;
`;

const EndTimeComponent: React.FC = () => {
  const [remainHour, setRemainHour] = useState<number>(0);
  const [remainMin, setRemainMin] = useState<number>(0);
  const [remainSec, setRemainSec] = useState<number>(0);

  const computeTime = () => {
    const hour = Number(moment().format('H')) * 3600;
    const min = Number(moment().format('m')) * 60;
    const sec = Number(moment().format('s'));

    const sum = hour + min + sec;

    const remainSum = sum >= 58200 ? 144600 - sum : 58200 - sum;

    const computedHour = ((Math.floor(remainSum / 3600)));
    const computedMin = (Math.floor((remainSum - (computedHour * 3600)) / 60));
    const computedSec = (Math.floor(remainSum - (computedHour * 3600) - (computedMin * 60)));

    setRemainHour(computedHour);
    setRemainMin(computedMin);
    setRemainSec(computedSec);
  };

  const startTime = () => {
    setInterval(() => computeTime(), 1000);
  };

  useEffect(() => {
    startTime();
  }, []);

  return (
    <TimeBox>
      <TitleWrapper>종례시간까지 남은시간</TitleWrapper>
      <TimeWrapper>
        {/* <InnerWrapper>
          {hour}<Unit>시</Unit> {min}<Unit>분</Unit> {sec}<Unit>초</Unit>
        </InnerWrapper> */}
        <InnerWrapper>
          {remainHour}
          {' '}
          <Unit> 시&nbsp;</Unit>
&nbsp;
          {remainMin}
          {' '}
          <Unit> 분&nbsp;</Unit>
&nbsp;
          {remainSec}
          {' '}
          <Unit> 초</Unit>
        </InnerWrapper>
      </TimeWrapper>
    </TimeBox>
  );
};

export default EndTimeComponent;
