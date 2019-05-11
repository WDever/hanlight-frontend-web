import * as React from 'react';
import styled from 'styled-components';
import PwFindContainer from 'container/auth/pwFind';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PwFindPage: React.FC = () => (
  <Template>
    <PwFindContainer />
  </Template>
);

export default PwFindPage;
