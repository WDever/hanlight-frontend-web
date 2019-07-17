import * as React from 'react';

import JoinContainer from 'container/hanseithon/join';
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
      <JoinContainer />
    </Template>
  );
};

export default JoinPage;
