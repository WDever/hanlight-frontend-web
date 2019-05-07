import * as React from 'react';
import styled from 'styled-components';
import PhoneCheckContainer from 'container/auth/phoneCheck';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhoneCheckPage: React.FC = () => (
  <Template>
    <PhoneCheckContainer />
  </Template>
);

export default PhoneCheckPage;
