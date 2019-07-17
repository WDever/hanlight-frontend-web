import * as React from 'react';

import HTMainContainer from 'container/hanseithon/main';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const HTMainPage: React.FC = () => {
  return (
    <Template>
      <HTMainContainer />
    </Template>
  );
};

export default HTMainPage;
