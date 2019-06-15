/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

const { useState, useEffect } = React;

const TimeBox = styled.div`
  height: 18rem;
  width: 30rem;
  z-index: 1;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 3rem;
  font-family: 'yg-jalnan';
  font-size: 1.875rem;
`;

const TimeWrapper = styled.div`
  vertical-align: bottom;
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  height: 5.5rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 3.5rem;
  color: #4470ff;
`;

const InnerWrapper = styled.div`
  display: table;
  vertical-align: bottom;
`;

const Unit = styled.span`
  font-family: 'yg-jalnan';
  font-size: 1.6875rem;
  font-weight: normal;
  color: black;
`;

const LunchTimeComponent: React.FC = () => {
  const [remainHour, setRemainHour] = useState<number>(0);
  const [remainMin, setRemainMin] = useState<number>(0);
  const [remainSec, setRemainSec] = useState<number>(0);

  const computeTime = () => {
    const hour = Number(moment().format('H')) * 3600;
    const min = Number(moment().format('m')) * 60;
    const sec = Number(moment().format('s'));

    const sum = hour + min + sec;

    const remainSum = sum >= 45000 ? 131400 - sum : 45000 - sum;

    const computedHour = Math.floor(remainSum / 3600);
    const computedMin = Math.floor((remainSum - computedHour * 3600) / 60);
    const computedSec = Math.floor(
      remainSum - computedHour * 3600 - computedMin * 60,
    );

    setRemainHour(computedHour);
    setRemainMin(computedMin);
    setRemainSec(computedSec);
  };

  useEffect(() => {
    const interval = setInterval(() => computeTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimeBox>
      <TitleWrapper>점심시간까지 남은시간</TitleWrapper>
      <TimeWrapper>
        <InnerWrapper>
          {remainHour} <Unit> 시&nbsp;</Unit>
          &nbsp;
          {remainMin} <Unit> 분&nbsp;</Unit>
          &nbsp;
          {remainSec} <Unit> 초</Unit>
        </InnerWrapper>
      </TimeWrapper>
    </TimeBox>
  );
};

export default LunchTimeComponent;
