import * as React from 'react';

import PhoneCheckContainer from 'container/user/phoneCheck';
import styled from 'styled-components';

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
