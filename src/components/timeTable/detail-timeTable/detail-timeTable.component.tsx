import {
  DetailTimeTableMethod,
  DetailTimeTableProps,
} from 'container/timeTable/detail-timeTable';
import { Device } from 'lib/styles';
import LogoSvg from 'lib/svg/hanlight-logo.svg';
import moment from 'moment';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const { useEffect } = React;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  margin-bottom: 7rem;
`;

const Title = styled.span`
  margin-top: 5.2rem;
  margin-bottom: 2.775rem;
  font-family: 'yg-jalnan';
  font-size: 1.8125rem;
  white-space: nowrap;

  @media ${Device.tabletL} {
    margin-top: 2.7rem;
  }
  @media ${Device.mobileL} {
    margin-top: 1.81rem;
    margin-bottom: 1.25rem;
    font-size: 1rem;
  }
`;

const Table = styled.table`
  z-index: 1;
  background-color: #ffffff;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0.35rem 0.1px;
  font-size: 1.2rem;
  font-family: 'Spoqa Han Sans';

  @media ${Device.mobileL} {
    font-size: 0.69rem;
  }
`;

const Th = styled.th<{ now: boolean }>`
  width: 7.3rem;
  height: 6.2rem;
  border: solid 1px #f3efef;
  background-color: ${props => (props.now ? '#e2f2ff' : 'none')};

  @media ${Device.mobileL} {
    width: 3.23rem;
    height: 2.73rem;
  }
`;

const Td = styled.td<{ now: boolean }>`
  width: 7.3rem;
  height: 6.2rem;
  border: solid 1px #f3efef;
  background-color: ${props => (props.now ? '#52a9ff' : 'none')};
  color: ${props => (props.now ? '#ffffff' : 'initial')};
  font-weight: ${props => (props.now ? 'bold' : 'none')};

  @media ${Device.mobileL} {
    width: 3.23rem;
    height: 2.73rem;
  }
`;

const Time = styled.span`
  font-size: 0.6875rem;
  font-weight: normal;

  @media ${Device.mobileL} {
    display: none;
  }
`;

const Img = styled.img`
  width: 65%;
`;

const hour = 3600;
const minute = 60;
const days = ['월', '화', '수', '목', '금'];

const DetailTimeTableComponent: React.FC<
  DetailTimeTableProps & DetailTimeTableMethod & RouteComponentProps
> = ({
  timeTableList,
  getTimetable,
  getTimetableStatus,
  accessToken,
  grade,
  classNum,
  major,
}) => {
  useEffect(() => {
    getTimetable(accessToken);
  }, []);

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
    '(8:40 ~ 9:30)',
    '(9:40 ~ 10:30)',
    '(10:40 ~ 11:30)',
    '(11:40 ~ 12:30)',
    '(13:20 ~ 14:10)',
    '(14:20 ~ 15:10)',
    '(15:20 ~ 16:10)',
  ];

  const tBody = Array(7)
    .fill(null)
    .map((_, i) => (
      <tr key={i}>
        <Th
          key={i}
          now={
            period() === i + 1 && moment().get('d') > 0 && moment().get('d') < 6
          }
        >
          {i + 1}교시
          <br />
          <Time>{timeArr[i]}</Time>
        </Th>
        {getTimetableStatus === 'success'
          ? timeTableList.slice(1, 6).map((timetable, j) => (
              <Td
                key={j}
                now={
                  period() === i + 1 &&
                  moment().get('d') === j + 1 &&
                  !!timetable[i]
                }
              >
                {timetable[i] ? timetable[i] : ''}
              </Td>
            ))
          : Array(5)
              .fill(null)
              .map((_, i) => (
                <Td key={i} now={false}>
                  {''}
                </Td>
              ))}
      </tr>
    ));

  return (
    <Wrapper>
      <Title>
        {major
          ? `${major}${grade} - ${classNum} 시간표`
          : '재학생만 시간표 조회가 가능합니다.'}
      </Title>
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

export default DetailTimeTableComponent;
