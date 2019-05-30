import * as React from 'react';
import styled from 'styled-components';
import { ErrorImg } from 'lib/styles';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import { TimeTableMethod, TimeTableProps } from 'container/main/timeTable';
import moment from 'moment';
import TimeTableItem from './timeTableItem';

const { useEffect } = React;

const TimeTableWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NoBox = styled.div`
  width: 12rem;
  height: 14.375rem;
  border-radius: 32px;
  border: solid 1px #b1b1b1;
  background-color: #ffffff;
  /* box-shdow: none; */
  color: black;
  font-family: 'Spoqa Han Sans';
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Texts = styled.span`
  font-family: inherit;
  font-weight: normal;
  color: black;
  font-size: 2.25rem;
`;

const TimeTableComponent: React.FC<TimeTableProps & TimeTableMethod> = ({
  timeTableList,
  timetableApi,
  timetableStatus,
}) => {
  const access_token = localStorage.getItem('accessToken');
  const Today: number = Number(moment().format('d')) - 1;
  let key = 0;
  const TimeTableList = timetableStatus === 'success'
    // && Today <= 5
    && timeTableList[Today].map((item, idx) => {
      const sum = Number(moment().format('H')) * 3600
        + Number(moment().format('m')) * 60
        + Number(moment().format('s'));
      const period = (): number => {
        if (sum >= 8 * 3600 + 2400 && sum <= 9 * 3600 + 1800) {
          return Number(0);
        }
        if (sum >= 9 * 3600 + 1800 && sum <= 10 * 3600 + 1800) {
          return Number(1);
        }
        if (sum >= 10 * 3600 + 1800 && sum <= 11 * 3600 + 1800) {
          return Number(2);
        }
        if (sum >= 11 * 3600 + 1800 && sum <= 12 * 3600 + 1800) {
          return Number(3);
        }
        if (sum >= 13 * 3600 + 1200 && sum <= 14 * 3600 + 600) {
          return Number(4);
        }
        if (sum >= 14 * 3600 + 600 && sum <= 15 * 3600 + 600) {
          return Number(5);
        }
        if (sum >= 15 * 3600 + 600 && sum <= 16 * 3600 + 600) {
          return Number(6);
        }
        return Number(7);
      };

      return (
        <TimeTableItem
          index={idx + 1}
          sub={item}
          active={idx === period()}
          key={key++}
        />
      );
    });

  useEffect(() => {
    timetableApi(access_token);
  }, [access_token, timetableApi]);

  return (
    <TimeTableWrapper>
      {TimeTableList}
      {timetableStatus === 'failure' && <ErrorImg src={ErrorPng} alt="Error" />}
      {timeTableList[Today].length <= 6 && (
        <NoBox>
          <Texts>오늘</Texts>
          <Texts>6교시야</Texts>
        </NoBox>
      )}
      {Today >= 5 && Today === 0 && timetableStatus !== 'none' && (
        <NoBox>
          <Texts>주말</Texts>
          <Texts>이야</Texts>
        </NoBox>
      )}
    </TimeTableWrapper>
  );
};

export default TimeTableComponent;
