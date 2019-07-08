import {
  MainTimeTableMethod,
  MainTimeTableProps,
} from 'container/timeTable/main-timeTable';
import { Device } from 'lib/styles';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import TimeTableItem from './timeTableItem';

const TimeTable = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.tabletL} {
    width: unset;
    height: 100%;
  }
`;

const NoBox = styled.div`
  width: 8.8rem;
  max-width: 8.8rem;
  height: 10.55rem;
  border-radius: 2rem;
  background-color: #ffffff;
  border: solid 1px #b1b1b1;

  @media ${Device.laptop} {
    width: 13%;
    height: 10rem;
  }
  @media ${Device.tabletL} {
    width: 7.05rem;
    height: 8.45rem;
    margin-right: 1.07rem;
    border-radius: 1rem;
  }
  @media ${Device.mobileL} {
    width: 5.1rem;
    height: 6.12rem;
  }
`;

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

  public today: number = moment().get('day');

  public componentDidMount() {
    this.props.getTimetableApi(this.props.accessToken);
  }

  public render() {
    const { timeTableList } = this.props;
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

    return <TimeTable>{TimeTableList}</TimeTable>;
  }
}
