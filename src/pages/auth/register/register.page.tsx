import * as React from 'react';

import RegisterContainer from 'container/user/register';
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
    align-items: flex-start;
    margin-top: 2.78rem;
  }
`;

const RegisterPage: React.FC = () => (
  <Template>
    <RegisterContainer />
  </Template>
);

export default RegisterPage;
