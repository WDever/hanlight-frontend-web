import * as React from 'react';

import PhoneCheckContainer from 'container/user/phoneCheck';
import { Device } from 'lib/styles';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media ${Device.mobileL} {
    padding: 0;
    align-items: flex-start;
    margin-top: 2.78rem;
  }
`;

const PhoneCheckPage: React.FC = () => (
  <Template>
    <PhoneCheckContainer />
  </Template>
);

export default PhoneCheckPage;
