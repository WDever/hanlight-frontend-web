import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ScheduleItem from './scheduleItem';

const ScheduleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Schedule: React.FC = () => {
  return (
    <ScheduleWrapper>
      <ScheduleItem date={`${moment().format('Y')}년 ${moment().format('M')} 월 ${moment().format('D')} 일`} active contents="메인 페이지" today />
      <ScheduleItem date={`${moment().format('Y')}년 ${moment().format('M')} 월 ${moment().format('D')} 일`} active={false} contents="토요휴업일" />
      <ScheduleItem date={`${moment().format('Y')}년 ${moment().format('M')} 월 ${moment().format('D')} 일`} active contents="토요휴업일" />
    </ScheduleWrapper>
  );
};

export default Schedule;
