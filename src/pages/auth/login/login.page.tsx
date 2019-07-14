import * as React from 'react';

import LoginContainer from 'container/user/login';
import { Device } from 'lib/styles';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  min-height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.mobileL} {
    padding: 0;
    margin-top: 2.78rem;
    align-items: flex-start;
  }
`;

const LoginPage: React.FC = () => (
  <Template>
    <LoginContainer />
  </Template>
);

export default LoginPage;
