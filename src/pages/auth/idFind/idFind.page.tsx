import * as React from 'react';
import styled from 'styled-components';
import IdFindContainer from 'container/auth/idFind';

const Template = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const IdFindPage: React.FC = () => (
  <Template>
    <IdFindContainer />
  </Template>
);

export default IdFindPage;
