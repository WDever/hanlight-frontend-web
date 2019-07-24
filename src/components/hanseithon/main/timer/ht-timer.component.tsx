import * as React from 'react';

import { Device } from 'lib/styles';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';

const { useState, useEffect } = React;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  font-size: 5.125rem;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  color: #ffffff;

  margin-bottom: 39.75rem;

  @media ${Device.mobileL} {
    font-size: 1.5rem;
    margin-bottom: 8.875rem;
  }
`;

const minUnit = 60;
const hourUnit = minUnit * 60;
const day = hourUnit * 24;
const totalTime = 15 * hourUnit;

const HTTimerComponent: React.FC = () => {
  const [sec, setSec] = useState<string>('00');
  const [min, setMin] = useState<string>('00');
  const [hour, setHour] = useState<string>('00');

  const formatTwoDigit = (x: number): string => ('0' + x).slice(-2);

  const computeTime = () => {
    const inHour = moment().get('hour') * 3600;
    const inMin = moment().get('minute') * 60;
    const inSec = moment().get('second');

    const sum = inHour + inMin + inSec;

    const SumTime = sum >= totalTime ? day + totalTime - sum : totalTime - sum;

    setHour(formatTwoDigit(Math.floor(SumTime / 3600)));
    setMin(formatTwoDigit(Math.floor((SumTime % 3600) / 60)));
    setSec(formatTwoDigit(Math.floor(SumTime % 60)));
  };

  useEffect(() => {
    const interval = setInterval(() => computeTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      {hour}시 : {min}분 : {sec}초
    </Wrapper>
  );
};

export default HTTimerComponent;
