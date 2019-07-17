import * as React from 'react';

import JoinComponent from 'components/hanseithon/join';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const JoinPage: React.FC = () => {
  return (
    <Template>
      <JoinComponent />
    </Template>
  );
};

export default JoinPage;
