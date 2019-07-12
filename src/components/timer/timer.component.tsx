import * as React from 'react';

import { Device } from 'lib/styles';
import HomeImgSvg from 'lib/svg/home-timer-illust.svg';
import LunchImgSvg from 'lib/svg/lunch-timer-illust.svg';
import moment from 'moment';
import styled from 'styled-components';

const { useState, useEffect } = React;

const Timer = styled.div`
  position: relative;
  width: 43%;
  max-width: 30rem;
  height: 100%;

  @media ${Device.tabletL} {
    width: 100%;
    max-width: unset;
    height: 35%;
    display: flex;
    justify-content: center;
  }
  @media ${Device.mobileL} {
    height: 43%;
  }
`;

const LunchTimer = styled(Timer)``;
const HomeTimer = styled(Timer)`
  width: 45%;

  @media ${Device.tabletL} {
    height: 47%;
  }
`;

const Title = styled.span`
  font-size: 1.75rem;
  font-family: 'yg-jalnan';
  margin-left: 1rem;

  @media ${Device.tabletL} {
    font-size: 1.5rem;
    display: inline-block;
    margin: 0;
  }
  @media ${Device.mobileL} {
    font-size: 1rem;
  }
`;

const LunchTimerImg = styled.img`
  position: absolute;
  width: 73%;
  max-height: 100%;
  bottom: 1rem;
  left: 0;

  @media ${Device.tabletL} {
    width: 41%;
    left: 0.25rem;
    bottom: 0;
  }
  @media ${Device.mobileL} {
    width: 52%;
  }
`;

const HomeTimerImg = styled.img`
  position: absolute;
  width: 100%;
  max-height: 100%;
  bottom: 0;
  left: 0;

  @media ${Device.tabletL} {
    width: 20.22rem;
    height: 11.12rem;
  }
  @media ${Device.mobileL} {
    width: 68%;
    height: unset;
    left: 1rem;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 3rem;
  font-family: 'yg-jalnan';
  font-size: 1.69rem;
  color: #000000;
  z-index: 1;

  @media ${Device.tabletL} {
    font-size: 1rem;
  }
  @media ${Device.mobileL} {
    font-size: 0.875rem;
  }
`;

const LunchContent = styled(Content)`
  left: 7.3rem;

  @media ${Device.tabletL} {
    top: unset;
    bottom: 2.875rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: baseline;
    left: 0;
  }
  @media ${Device.mobileL} {
    bottom: 3.2rem;
  }
`;

const HomeContent = styled(Content)`
  right: 0;

  @media ${Device.tabletL} {
    top: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: baseline;
    left: 0;
  }
  @media ${Device.mobileL} {
    top: unset;
    bottom: 3.4rem;
    margin-bottom: 0.65rem;
  }
`;

const Time = styled.span`
  font-family: 'Spoqa Han Sans';
  font-size: 3.375rem;
  font-weight: bold;
  color: #4470ff;
  margin-right: 0.77rem;

  @media ${Device.tabletL} {
    font-size: 1.69rem;
    margin-right: 0.69rem;
  }
  @media ${Device.mobileL} {
    font-size: 1.5rem;
  }
`;

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const lunch = 12 * hour + 30 * minute;
const home = 16 * hour + 10 * minute;

const TimerComponent: React.FC = () => {
  const [mount, setMount] = useState<boolean>(false);
  const [lunchHour, setLunchHour] = useState<string>('00');
  const [lunchMin, setLunchMin] = useState<string>('00');
  const [lunchSec, setLunchSec] = useState<string>('00');
  const [homeHour, setHomeHour] = useState<string>('00');
  const [homeMin, setHomeMin] = useState<string>('00');
  const [homeSec, setHomeSec] = useState<string>('00');

  const formatTwoDigit = (x: number): string => ('0' + x).slice(-2);

  const computeTime = () => {
    const hour = moment().get('hour') * 3600;
    const min = moment().get('minute') * 60;
    const sec = moment().get('second');

    const sum = hour + min + sec;

    const remainLunchSum = sum >= lunch ? day + lunch - sum : lunch - sum;
    const remainHomeSum = sum >= home ? day + home - sum : home - sum;

    setLunchHour(formatTwoDigit(Math.floor(remainLunchSum / 3600)));
    setLunchMin(formatTwoDigit(Math.floor((remainLunchSum % 3600) / 60)));
    setLunchSec(formatTwoDigit(Math.floor(remainLunchSum % 60)));

    setHomeHour(formatTwoDigit(Math.floor(remainHomeSum / 3600)));
    setHomeMin(formatTwoDigit(Math.floor((remainHomeSum % 3600) / 60)));
    setHomeSec(formatTwoDigit(Math.floor(remainHomeSum % 60)));
    setMount(true);
  };

  useEffect(() => {
    const interval = setInterval(() => computeTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return mount ? (
    <>
      <LunchTimer>
        <Title>점심시간까지 남은시간</Title>
        <LunchTimerImg src={LunchImgSvg} alt='' />
        <LunchContent>
          <Time>{lunchHour}</Time>시&emsp;
          <Time>{lunchMin}</Time>분&emsp;
          <Time>{lunchSec}</Time>초
        </LunchContent>
      </LunchTimer>
      <HomeTimer>
        <Title>종례시간까지 남은시간</Title>
        <HomeTimerImg src={HomeImgSvg} alt='' />
        <HomeContent>
          <Time>{homeHour}</Time>시&emsp;
          <Time>{homeMin}</Time>분&emsp;
          <Time>{homeSec}</Time>초
        </HomeContent>
      </HomeTimer>
    </>
  ) : (
    <></>
  );
};

export default TimerComponent;
