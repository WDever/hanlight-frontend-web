import * as React from 'react';

import HanseiThonComponent from 'components/hanseithon';
import { Device } from 'lib/styles';
import FooterPage from 'pages/footer';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  @media ${Device.tabletL} {
    display: none;
  }
`;

const HanseiThonPage: React.FC = () => {
  return (
    <>
      <HanseiThonComponent />
      <FooterWrapper>
        <FooterPage />
      </FooterWrapper>
    </>
  );
};

export default HanseiThonPage;
