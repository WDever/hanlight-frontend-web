import { TimeTableMethod, TimeTableProps } from 'container/timeTable';
import LogoSvg from 'lib/svg/hanlight-logo.svg';
import moment from 'moment';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const { useEffect, useState } = React;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  margin-bottom: 7rem;
`;

const Title = styled.span`
  font-size: 1.8125rem;
  margin-top: 5.2rem;
  margin-bottom: 2.775rem;
  font-family: 'yg-jalnan';
  font-size: 1.8125rem;
  white-space: nowrap;
`;

const Table = styled.table`
  z-index: 1;
  background-color: #ffffff;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0.35rem 0.1px;
  font-size: 1.2rem;
  font-family: 'Spoqa Han Sans';
`;

const Th = styled.th<{ now: boolean }>`
  width: 7.3rem;
  height: 6.2rem;
  border: solid 1px #f3efef;
  background-color: ${props => (props.now ? '#e2f2ff' : 'none')};
`;

const Td = styled.td<{ now: boolean }>`
  width: 7.3rem;
  height: 6.2rem;
  border: solid 1px #f3efef;
  background-color: ${props => (props.now ? '#52a9ff' : 'none')};
  color: ${props => (props.now ? '#ffffff' : 'initial')};
  font-weight: ${props => (props.now ? 'bold' : 'none')};
`;

const Time = styled.span`
  font-size: 0.6875rem;
  font-weight: normal;
`;

const Img = styled.img`
  width: 3.8rem;
  height: 2.0125rem;
`;

const hour = 3600;
const minute = 60;
const days = ['월', '화', '수', '목', '금'];

const TimeTableComponent: React.FC<
  TimeTableProps & TimeTableMethod & RouteComponentProps
> = ({
  timeTableList,
  getTimetable,
  getTimetableStatus,
  accessToken,
  grade,
  classNum,
  major,
}) => {
  const [timeTable, setTimeTable] = useState<string[][]>([[], [], [], [], []]);

  useEffect(() => {
    getTimetable(accessToken);
  }, []);

  useEffect(() => {
    if (getTimetableStatus === 'success') {
      setTimeTable([...timeTableList].splice(1, 5));
    }
  }, [getTimetableStatus]);

  const sum =
    moment().get('hour') * hour +
    moment().get('minute') * minute +
    moment().get('second');

  const period = (): number => {
    if (sum >= 15 * hour + 10 * minute) {
      return 7;
    } else if (sum >= 14 * hour + 0 * minute) {
      return 6;
    } else if (sum >= 12 * hour + 20 * minute) {
      return 5;
    } else if (sum >= 11 * hour + 30 * minute) {
      return 4;
    } else if (sum >= 10 * hour + 30 * minute) {
      return 3;
    } else if (sum >= 9 * hour + 30 * minute) {
      return 2;
    } else {
      return 1;
    }
  };

  const timeArr = [
    '(8:40 ~ 9:20)',
    '(9:30 ~ 10:20)',
    '(10:30 ~ 11:20)',
    '(11:30 ~ 12:20)',
    '(13:20 ~ 14:10)',
    '(14:20 ~ 15:10)',
    '(15:20 ~ 16:10)',
  ];

  const tBody = timeTable[1].length ? (
    Array(7)
      .fill(null)
      .map((_, i) => (
        <tr key={i}>
          <Th key={i} now={period() === i + 1}>
            {i + 1}교시
            <br />
            <Time>{timeArr[i]}</Time>
          </Th>
          {timeTable.map((timetable, j) => (
            <Td key={j} now={period() === i + 1 && moment().get('d') === j + 1}>
              {timetable[i] ? timetable[i] : ''}
            </Td>
          ))}
        </tr>
      ))
  ) : (
    <></>
  );

  return (
    <Wrapper>
      <Title>{`${major}${grade} - ${classNum} 시간표`}</Title>
      <Table>
        <thead>
          <tr>
            <Th now={false}>
              <Img src={LogoSvg} alt="logo" />
            </Th>
            {days.map((day, j) => (
              <Th key={j} now={moment().get('d') === j + 1}>
                {day}요일
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>{tBody}</tbody>
      </Table>
    </Wrapper>
  );
};

export default TimeTableComponent;
