import LoginContainer from 'container/auth/login';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginPage: React.FC = () => (
  <Template>
    <LoginContainer />
  </Template>
);

export default LoginPage;
