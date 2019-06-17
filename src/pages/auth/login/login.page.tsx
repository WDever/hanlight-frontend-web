import * as React from 'react';

import LoginContainer from 'container/user/login';
import LoginIllustSvg from 'lib/svg/login-illust.svg';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Background = styled.div`

`;

const LoginIllust = styled.img`
  position: absolute;
  left: 5%;
  width: 42.6%;
  height: 65.8%;
`;

const LoginPage: React.FC = () => (
  <Template>
    <LoginIllust src={LoginIllustSvg} alt="Login Illust" />
    <LoginContainer />
  </Template>
);

export default LoginPage;
