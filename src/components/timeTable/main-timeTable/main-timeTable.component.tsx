import {
  MainTimeTableMethod,
  MainTimeTableProps,
} from 'container/timeTable/main-timeTable';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import TimeTableItem from './timeTableItem';

const { useEffect } = React;

const Title = styled.div`
  max-width: 81rem;
  width: 90%;
  font-family: 'yg-jalnan';
  font-size: 1.875rem;
  margin-bottom: 2rem;
`;

const Colored = styled.span`
  color: #4470ff;
`;

const TimeTableWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoBox = styled.div`
  width: 9.1875rem;
  height: 11rem;
  font-size: 1.625rem;
  border-radius: 32px;
  background-color: #ffffff;
  border: solid 1px #b1b1b1;
  color: black;
  font-family: 'Spoqa Han Sans';
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const days = ['일', '월', '화', '수', '목', '금', '토'];
const hour = 3600;
const minute = 60;

export default class MainTimeTableComponent extends React.Component<
  MainTimeTableProps & MainTimeTableMethod
> {
  public state: {
    timeTableList: string[];
  } = {
    timeTableList: [],
  };

  public today: number = Number(moment().format('d'));

  public componentDidMount() {
    this.props.getTimetableApi(this.props.accessToken);
  }

  public render() {
    const { timeTableList, getTimetableStatus, name } = this.props;
    const { today } = this;

    const TimeTableList = Array(7)
      .fill(null)
      .map((value, index) => {
        if (!timeTableList[today].length || !timeTableList[today][index]) {
          return <NoBox key={index} />;
        } else {
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

          return (
            <TimeTableItem
              index={index + 1}
              sub={timeTableList[today][index]}
              active={index + 1 === period()}
              key={index}
            />
          );
        }
      });

    return (
      <>
        <Title>
          <Colored>{days[today]}요일</Colored> 시간표
        </Title>

        <TimeTableWrapper>{TimeTableList}</TimeTableWrapper>
      </>
    );
  }
}
