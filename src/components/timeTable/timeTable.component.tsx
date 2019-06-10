import { TimeTableMethod, TimeTableProps } from 'container/timeTable';
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
  width: 50.5%;
  height: 100%;
  z-index: 1;
`;

const Title = styled.span`
  font-size: 1.8125rem;
  margin: 2.775rem 0;
  */font-family: 'yg-jalnan';
  font-size: 1.8125rem;

  margin: 6% 0;
`;

const Table = styled.div`
  width: 100%;
  height: 68%;
  display: flex;

  justify-content: space-between;
`;

const Block = styled.div<{ now?: boolean; subject?: boolean }>`
  height: 14.2%;
  max-height: 14.2%;
  color: ${props => (props.subject && props.now ? '#ffffff' : 'black')};
  border: solid 1px #f3efef;
  background-color: ${props =>
    props.now && props.subject ? '#52a9ff' : props.now ? '#e2f2ff' : '#ffffff'};
  font-family: 'Spoqa Han Sans';
  font-size: 1.0625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DaysLine = styled.div`
  width: 15.9%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TimeTableBlock = styled.div`
  width: 83%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const TimeTableLine = styled.div`
  height: 100%;
  width: 19%;
  display: flex;
  flex-direction: column;
`;

const Time = styled.span`
  font-size: 0.6875rem;
`;

const Img = styled.img`
  width: 3.8rem;
  height: 2.0125rem;
`;

const TimeTableComponent: React.FC<
  TimeTableProps & TimeTableMethod & RouteComponentProps
> = ({
  timeTableList,
  timetableApi,
  timetableStatus,
  accessToken,
  grade,
  classNum,
}) => {
  const sum =
    Number(moment().format('H')) * 3600 +
    Number(moment().format('m')) * 60 +
    Number(moment().format('s'));
  const period = (): number => {
    if (sum >= 8 * 3600 + 2400 && sum <= 9 * 3600 + 1800) {
      return 0;
    } else if (sum >= 9 * 3600 + 1800 && sum <= 10 * 3600 + 1800) {
      return 1;
    } else if (sum >= 10 * 3600 + 1800 && sum <= 11 * 3600 + 1800) {
      return 2;
    } else if (sum >= 11 * 3600 + 1800 && sum <= 12 * 3600 + 1800) {
      return 3;
    } else if (sum >= 13 * 3600 + 1200 && sum <= 14 * 3600 + 600) {
      return 4;
    } else if (sum >= 14 * 3600 + 600 && sum <= 15 * 3600 + 600) {
      return 5;
    } else if (sum >= 15 * 3600 + 600 && sum <= 16 * 3600 + 600) {
      return 6;
    } else {
      return 7;
    }
  };

  const daysArr = ['일', '월', '화', '수', '목', '금', '토'];
  const periodArr = [
    {
      num: 1,
      time: '(9:00 ~ 9:50)',
    },
    {
      num: 2,
      time: '(10:00 ~ 10:50)',
    },
    {
      num: 3,
      time: '(11:00 ~ 11:50)',
    },
    {
      num: 4,
      time: '(12:00 ~ 12:50)',
    },
    {
      num: 5,
      time: '(13:30 ~ 14:20)',
    },
    {
      num: 6,
      time: '(14:30 ~ 15:20)',
    },
    {
      num: 7,
      time: '(15:30 ~ 16:20)',
    },
  ];

  const periodsLine = periodArr.map((item, idx) => {
    return (
      <Block key={item.num} now={idx === period()}>
        <b>{item.num}교시</b>
        <Time>{item.time}</Time>
      </Block>
    );
  });

  const TimeTableList =
    timetableStatus === 'success'
      ? [...timeTableList].splice(1, 5).map((item1, idx1) => {
          return (
            <TimeTableLine key={idx1}>
              <Block now={idx1 + 1 === Number(moment().format('d'))}>
                <b>{daysArr[idx1 + 1]}요일</b>
              </Block>
              {item1.map((item2, idx2) => {
                return (
                  <Block
                    key={idx2}
                    now={
                      idx1 + 1 === Number(moment().format('d')) &&
                      idx2 === period()
                    }
                    subject={true}
                  >
                    {item2}
                  </Block>
                );
              })}
              {Array(7 - item1.length)
                .fill(null)
                .map((item3, idx3) => {
                  return (
                    <Block key={idx3} subject={true}>
                      없다
                    </Block>
                  );
                })}
            </TimeTableLine>
          );
        })
      : [];

  useEffect(() => {
    timetableApi(accessToken);
  }, [accessToken, timetableApi]);

  return (
    <Wrapper>
      <Title>
        {grade} - {classNum} 시간표
      </Title>
      <Table>
        <DaysLine>
          <Block>
            <Img src={LogoSvg} alt="logo" />
          </Block>
          {periodsLine}
        </DaysLine>
        <TimeTableBlock>{TimeTableList}</TimeTableBlock>
      </Table>
    </Wrapper>
  );
};

export default TimeTableComponent;
