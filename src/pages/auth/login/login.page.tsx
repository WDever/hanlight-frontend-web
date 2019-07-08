import * as React from 'react';

import LoginContainer from 'container/user/login';
import { Device } from 'lib/styles';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.mobileL} {
    align-items: flex-start;
    margin-top: 2.78rem;
  }
`;

const LoginPage: React.FC = () => (
  <Template>
    <LoginContainer />
  </Template>
);

export default LoginPage;
