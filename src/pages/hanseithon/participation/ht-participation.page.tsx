import * as React from 'react';

import HTParticipationContainer from 'container/hanseithon/participation';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const HTParticipationPage: React.FC = () => {
  return (
    <Template>
      <HTParticipationContainer />
    </Template>
  );
};

export default HTParticipationPage;
