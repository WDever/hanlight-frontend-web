import * as React from 'react';

import AcceptPageContainer from 'container/hanseithon/main/acceptPage';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  position: absolute;
  z-index: 9;
  display: flex;
  justify-content: center;
`;

const AcceptPage: React.FC = () => {
  return (
    <Template>
      <AcceptPageContainer />
    </Template>
  );
};

export default AcceptPage;
