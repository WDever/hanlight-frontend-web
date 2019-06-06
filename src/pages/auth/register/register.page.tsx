import * as React from 'react';

import RegisterContainer from 'container/user/register';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RegisterPage: React.FC = () => (
  <Template>
    <RegisterContainer />
  </Template>
);

export default RegisterPage;
