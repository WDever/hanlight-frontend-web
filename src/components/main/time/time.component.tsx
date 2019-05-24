import * as React from 'react';
import styled from 'styled-components';
import EndTimeComponent from './endTime';
import LunchTimeComponent from './lunchTime';

const Template = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const TimeComponent: React.FC = () => {
  return (
    <Template>
      <LunchTimeComponent />
      <EndTimeComponent />
    </Template>
  );
};

export default TimeComponent;
