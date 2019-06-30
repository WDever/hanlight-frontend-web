import * as React from 'react';

import DetailCalendarContainer from 'container/calendar/detail-calendar';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailCalendarPage: React.FC = () => (
  <Template>
    <DetailCalendarContainer />
  </Template>
);

export default DetailCalendarPage;
