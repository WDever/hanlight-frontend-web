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
    margin-bottom: 12.375rem;
  }
`;

const min = 60;
const hour = min * 60;
const day = hour * 24;
const endTime = 17 * hour + 32 * min;

const HTTimerComponent: React.FC = () => {
  const [viewSec, setViewSec] = useState<string>('00');
  const [viewMin, setViewMin] = useState<string>('00');
  const [viewHour, setViewHour] = useState<string>('00');
  const [sum, setSum] = useState<number>(1);

  const formatTwoDigit = (x: number): string => ('0' + x).slice(-2);

  const computeTime = () => {
    const inHour = moment().get('hour') * hour;
    const inMin = moment().get('minute') * min;
    const inSec = moment().get('second');

    const sum = inHour + inMin + inSec;

    const SumTime = sum >= endTime ? day + endTime - sum : endTime - sum;

    setSum(SumTime);

    if (SumTime === 86400) {
      setViewHour('00');
      setViewMin('00')
      setViewSec('00')
    } else {
      setViewHour(formatTwoDigit(Math.floor(SumTime / hour)));
      setViewMin(formatTwoDigit(Math.floor((SumTime % hour) / min)));
      setViewSec(formatTwoDigit(Math.floor(SumTime % min)));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => computeTime(), 1000);

    if (sum === 86400) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [sum]);

  return (
    <Wrapper>
      {viewHour}시 : {viewMin}분 : {viewSec}초
    </Wrapper>
  );
};

export default HTTimerComponent;
